"""
nanogen - a very small static site generator
"""
import os
import re
import datetime
import subprocess

import yaml
import click
import jinja2

from . import __version__, logger, renderer


FM_SEPARATOR = '----'
PATHS = {
    'cwd': os.getcwd(),
    'site': os.path.join(os.getcwd(), '_site'),
    'posts': os.path.join(os.getcwd(), '_posts'),
    'layouts': os.path.join(os.getcwd(), '_layouts'),
}

JINJA_LOADER = jinja2.FileSystemLoader([PATHS['cwd'], PATHS['layouts']])
JINJA_ENV = jinja2.Environment(loader=JINJA_LOADER)


class Post(object):
    """Represents a post."""

    def __init__(self, path_to_file):
        logger.log.info('Processing post at %s', path_to_file)
        self.markdown = renderer.markdown
        self.path = path_to_file
        self.filename = self.path.split('/')[-1]

        with open(self.path, 'r') as p:
            p_full = p.read()

        p_split = p_full.split(FM_SEPARATOR)
        if len(p_split) == 3:
            self.config = yaml.safe_load(p_split[1])
            content_raw = p_split[2].strip()
        else:
            self.config = yaml.safe_load(p_split[0])
            content_raw = p_split[1].strip()

        self.content = self.markdown(content_raw)

    def __getattr__(self, item):
        """
        Attempt to find the "missing" attribute in the post's configuration.
        """
        if item in self.config:
            return self.config[item]
        logger.log.warning('Unable to locate attribute %s', item)
        return None

    def __repr__(self):
        return u'Post(path={})'.format(self.path)

    @property
    def pub_date(self):
        year, month, day = map(int, self.filename.split('-', 3)[:3])
        return datetime.datetime(year=year, month=month, day=day)

    @property
    def slug(self):
        if 'slug' in self.config:
            _slug = self.config['slug']
        else:
            _slug = '-'.join(self.filename.split('-', 3)[3:]).rsplit('.', 1)[0]
        return _slug

    @property
    def html_filename(self):
        return '{}.html'.format(self.slug)

    @property
    def permapath(self):
        dt = self.pub_date
        return os.path.join(PATHS['site'], str(dt.year),
                            '{:02d}'.format(dt.month), self.html_filename)

    @property
    def permalink(self):
        dt = self.pub_date
        return '/{}/{:02d}/{}'.format(dt.year, dt.month, self.html_filename)


def _slugify(text):
    """Create a suitable slug for the given text"""
    return re.sub(r'\W', '-', text).lower()


def _read_config():
    """Read the config YAML file (if it exists), and return it as a dict.

    :return dict: the configuration dictionary
    """
    logger.log.info('Reading configuration...')
    cfg_file = os.path.join(PATHS['cwd'], 'config.yaml')
    if os.path.isfile(cfg_file):
        with open(cfg_file, 'r') as cf:
            config = yaml.safe_load(cf.read())
            logger.log.debug('Site-wide configuration: %s', config)
            return config
    else:
        logger.log.warning('Warning: no configuration file found.')

    return {}


def _is_valid_post_file(path):
    """
    Determines if the given path is valid for a post file.

    The criteria:
        1. The file can't start with an underscore; these are ignored
        2. The file's name must match the pattern yyyy-mm-dd-*
        3. The file's extension must be a valid Markdown extension

    :param path: The file path to validate
    """
    post_pattern = r'^\d{4}-\d{2}-\d{2}-.*'
    markdown_extenstions = ['md', 'markdown', 'mdown']

    filename, ext = os.path.basename(path).rsplit('.', 1)

    ignored = not filename.startswith('_')
    valid_filename = re.match(post_pattern, filename)
    valid_ext = ext in markdown_extenstions

    return ignored and valid_filename and valid_ext


def _clean():
    logger.log.info('Cleaning generated files...')
    site_dir = PATHS['site']
    if os.path.isdir(site_dir):
        subprocess.call(['rm', '-r', site_dir])


def _build():
    config = _read_config()

    if not os.path.isdir(PATHS['site']):
        logger.log.debug('Creating site directory...')
        subprocess.call(['mkdir', PATHS['site']])

    logger.log.info('Processing posts...')
    ls = os.listdir(PATHS['posts'])
    post_path = lambda path: os.path.join(PATHS['posts'], path)
    posts = [Post(post_path(p)) for p in ls if _is_valid_post_file(p)]

    for post in posts:
        logger.log.debug('Rendering template for post %s', post.path)
        template = JINJA_ENV.get_template(post.layout or 'article.html')
        html = template.render(site=config, post=post)

        logger.log.debug('Writing post to disk: %s', post)
        post_dir = os.path.dirname(post.permapath)
        if not os.path.isdir(post_dir):
            logger.log.debug('Creating post directory %s', post_dir)
            subprocess.call(['mkdir', '-p', post_dir])

        logger.log.debug('Writing post to %s', post.permapath)
        with open(post.permapath, 'w') as pout:
            pout.write(html)

    logger.log.info('Processing non-post files...')
    for dirpath, subdirs, files in os.walk(PATHS['cwd']):
        logger.log.debug('Walking {}...'.format(dirpath))
        subdirs[:] = [d for d in subdirs if not d[0] in ['_', '.']]
        files[:] = [f for f in files if f.endswith('.html') or f.endswith('.xml')]
        rel_path = dirpath.replace(PATHS['cwd'], '').strip('/')

        for f in files:
            logger.log.debug('Processing %s', f)
            template = JINJA_ENV.get_template(f)
            html = template.render(site=config, posts=posts)

            file_dir = os.path.join(PATHS['site'], rel_path)

            if not os.path.isdir(file_dir):
                logger.log.debug('Creating directory %s', file_dir)
                subprocess.call(['mkdir', '-p', os.path.dirname(file_dir)])

            file_path = os.path.join(file_dir, f)
            logger.log.debug('Writing %s to %s', f, file_path)
            with open(file_path, 'w') as pout:
                pout.write(html)

        if rel_path in config.get('keep', []):
            logger.log.debug('Keeping directory %s', rel_path)
            subdirs[:] = []

            file_dir = os.path.join(PATHS['site'], rel_path)

            if not os.path.isdir(file_dir):
                logger.log.debug('Creating directory %s', file_dir)
                subprocess.call(['mkdir', '-p', file_dir])

            copy_path = os.path.join(PATHS['site'], rel_path)
            logger.log.debug('Recursively copying %s to %s', dirpath, copy_path)
            subprocess.call(['cp', '-r', dirpath, PATHS['site']])


@click.group()
@click.option('-v', '--verbose', count=True, help='Turn on verbose output.')
@click.version_option(version=__version__)
@click.pass_context
def cli(ctx, verbose):
    logger.init_logger(verbose)


@cli.command()
@click.pass_context
def init(ctx):
    """Initialize the current directory."""
    for d in [PATHS['posts'], PATHS['templates']]:
        logger.log.debug('Creating directory %s' % d)
        if not os.path.isdir(d):
            subprocess.call(['mkdir', d])


@cli.command()
@click.pass_context
def clean(ctx):
    """Clean any generated files."""
    _clean()


@cli.command()
@click.pass_context
def build(ctx):
    """Start a build of the site."""
    _clean()
    _build()


@cli.command()
@click.option('-h', '--host', default='localhost', help='The hostname to serve on')
@click.option('-p', '--port', default=8080, type=int, help='The port to serve on')
@click.pass_context
def preview(ctx, host, port):
    """Serve a preview of the site on HOST and PORT."""
    try:
        import SimpleHTTPServer, BaseHTTPServer
        handler = SimpleHTTPServer.SimpleHTTPRequestHandler
        handler.protocol_version = 'HTTP/1.0'
        httpd = BaseHTTPServer.HTTPServer((host, 8080), handler)
    except ImportError:
        import http.server
        handler = http.server.SimpleHTTPRequestHandler
        handler.protocol_version = 'HTTP/1.0'
        httpd = http.server.HTTPServer(host, 8080, handler)

    root = PATHS['site']
    os.chdir(root)

    try:
        click.secho('Serving your site on http://{host}:{port}/...'.format(host=host, port=port))
        click.secho('Press <Ctrl-C> to stop the server.\n')
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()


@cli.command()
@click.argument('title')
@click.option('-l', '--layout', default='article.html', help='The layout template the post will use')
@click.pass_context
def new(ctx, title, layout):
    """Create a new post with the given title"""
    date = datetime.datetime.now().strftime('%Y-%m-%d')
    slug = _slugify(title)
    filename = '{}-{}.md'.format(date, slug)
    full_path = os.path.join(PATHS['posts'], filename)

    if not layout.endswith('.html'):
        layout += '.html'

    if not os.path.isfile(full_path):
        with open(full_path, 'w') as f:
            text = """----
title: {title}
slug: {slug}
layout: {layout}
----

Your post content goes here.
            """.format(title=title, slug=slug, layout=layout)
            f.write(text)

        logger.log.info('Created {file}'.format(file=full_path))
        click.secho("Created {file}".format(file=full_path), fg='green')
    else:
        logger.log.error('A post with that date and title already exists')
        raise click.ClickException('A post with that date and title already exists')
