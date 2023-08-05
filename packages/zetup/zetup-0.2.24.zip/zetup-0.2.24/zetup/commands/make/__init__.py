# zetup.py
#
# Zimmermann's Python package setup.
#
# Copyright (C) 2014-2015 Stefan Zimmermann <zimmermann.code@gmail.com>
#
# zetup.py is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# zetup.py is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License
# along with zetup.py. If not, see <http://www.gnu.org/licenses/>.

import re
from textwrap import dedent
from glob import glob

from jinja2 import FileSystemLoader, TemplateNotFound
from jinjatools import Environment

import zetup
from zetup.path import Path
from zetup.zetup import Zetup
from zetup.commands import ZetupCommandError


class Loader(FileSystemLoader):
    def __init__(self):
        self.templates_dir = Path(__path__[0]) / 'templates'
        super(Loader, self).__init__(self.templates_dir)

    def get_source(self, env, target):
        source, _, uptodate = super(Loader, self).get_source(
          env, target + '.jinja')
        return source, target, uptodate


class Made(list):
    def __init__(self):
        self.status = 0

    def clean(self):
        for path in self:
            if path.exists():
                print("zetup: Removing auto-generated %s" % path)
                path.remove()
            if path.ext == '.py':
                compiled = []
                path = path.splitext()[0] + '.pyc'
                if path.exists():
                    compiled.append(path)
                compiled += glob(path.dirname() / '__pycache__'
                                 / path.namebase + '.*.pyc')
                for path in map(Path, compiled):
                    print("zetup: Removing compiled %s" % path)
                    path.remove()

    def __enter__(self):
        return self

    def __exit__(self, *exc_info):
        self.clean()


class ZetupMakeError(ZetupCommandError):
    def __init__(self, made, message):
        ZetupCommandError.__init__(self, message)
        made.clean()


@Zetup.command()
def make(zfg, args=None, targets=None, force=None, skip_existing=False):
    if args:
        targets = args.targets
        force = args.force
    if force is None:
        force = zfg.FORCE_MAKE
    if not targets:
        raise ZetupCommandError("No targets given. You can 'make all'.")
    env = Environment(loader=Loader())
    if 'all' in targets:
        templates_dir = Path(env.loader.templates_dir)
        targets = [templates_dir.relpathto(tpath).rsplit('.', 1)[0]
                   for tpath in templates_dir.walkfiles()
                   if tpath.endswith('.jinja')]
        skip_existing = True

    made = Made()
    for target in targets:
        if zfg.NO_MAKE and target in zfg.NO_MAKE:
            continue
        if target in ['zetup_config', 'zfg']:
            if zfg.ZETUP_CONFIG_PACKAGE:
                target = '__init__.py'
            elif zfg.ZETUP_CONFIG_MODULE:
                target = 'package/zetup_config.py'
            else:
                continue
        if zfg.PACKAGES:
            target = re.sub(
              '^%s/' % zfg.PACKAGES.main, 'package/', target)
        path = target
        if zfg.PACKAGES:
            path = re.sub(
              '^package', zfg.PACKAGES.main.replace(*'./'), path)
        path = Path(zfg.ZETUP_DIR) / path
        if path.exists():
            if skip_existing:
                print("zetup: NOT generating existing %s" % target)
                continue
            if not force:
                raise ZetupMakeError(made,
                  "Target '%s' already exists." % target
                  + "Overwrite with -f or --force")
        try:
            template = env.get_template(target)
        except TemplateNotFound:
            raise ZetupMakeError(made,
              "No template for target '%s'." % target)
        print("zetup: Generating %s" % target)
        text = template.render({
          'zetup_header': dedent("""
            # This file was auto-generated by zetup
            #
            # https://bitbucket.org/userzimmermann/zetup.py
            """),
          'zetup': zetup,
          'zfg': zfg,
          })
        path.write_text(text.strip())
        if not zfg.KEEP_MADE or target not in zfg.KEEP_MADE:
            made.append(path)

    return made
