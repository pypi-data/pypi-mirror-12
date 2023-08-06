#!/usr/bin/env python
"""
matisse_config.py, module definition of MatisseConfig class.
"""
from __future__ import print_function
import logging
from dirsync import sync
import os
from shutil import copyfile, copytree, rmtree
import sys


class MatisseConfig(object):
  """
  MaTiSSe.py configuration.

  Attributes
  ----------
  __highlight_styles : list
    list of available highlight.js styles
  __themes : list
    list of builtin themes
  """
  __highlight_styles = []
  __themes = []

  def __init__(self, cliargs=None):
    """
    Parameters
    ----------
    cliargs : argparse parsed object
      command line arguments parsed

    Attributes
    ----------
    verbose : bool
      more verbose printing messages (default no)
    online_mathjax : bool
      use online rendering of LaTeX equations by means of online MathJax service;
      default no, use offline local copy of MathJax engine
    highlight : bool
      use highlight.js for syntax highlithing of code blocks
    highlight_style : str
      css style file for highlight.js; the list of available styles can be print by
      'str_highlight_styles' method
    theme : str
      builtin theme chosen
    toc_at_chap_beginning : bool
      insert a slide with TOC at the beginning of each chapter (default false)
    toc_at_sec_beginning : bool
      insert a slide with TOC at the beginning of each section (default false)
    toc_at_subsec_beginning : bool
      insert a slide with TOC at the beginning of each subsection (default false)
    """
    self.verbose = False
    self.online_mathjax = False
    self.highlight = True
    self.highlight_style = 'github.css'
    self.theme = None
    self.toc_at_chap_beginning = None
    self.toc_at_sec_beginning = None
    self.toc_at_subsec_beginning = None
    self.pdf = False
    self.print_parsed_source = False
    self.__get_highlight_styles()
    self.__check_highlight_style()
    self.__get_themes()
    self.__check_theme()
    if cliargs:
      self.update(cliargs=cliargs)
    if self.verbose:
      print(self)
    return

  def __str__(self):
    string = ['MaTiSSe.py configuration']
    string.append('\n  Verbose mode: ' + str(self.verbose))
    if self.online_mathjax:
      string.append('\n  LaTeX equations rendering by means of online MathJax service')
    else:
      string.append('\n  LaTeX equations rendering by means offline, local copy of MathJax')
    if self.highlight:
      string.append('\n  Highlight.js style: ' + self.highlight_style)
    string.append('\n  Insert TOC at chapters beginning: ' + str(self.toc_at_chap_beginning))
    string.append('\n  Insert TOC at sections beginning: ' + str(self.toc_at_sec_beginning))
    string.append('\n  Insert TOC at subsections beginning: ' + str(self.toc_at_subsec_beginning))
    return ''.join(string)

  @staticmethod
  def __get_highlight_styles():
    """Get the available highlight.js styles."""
    hilite_styles = os.path.join(os.path.dirname(__file__), 'utils/js/highlight/styles')
    for css in os.listdir(hilite_styles):
      if css.endswith(".css"):
        MatisseConfig.__highlight_styles.append(css)
    return

  @staticmethod
  def __get_themes():
    """Get the builtin themes."""
    themes = os.path.join(os.path.dirname(__file__), 'utils/builtin_themes')
    for theme in os.listdir(themes):
      MatisseConfig.__themes.append(theme)
    return

  def __check_highlight_style(self):
    """Check if the selected highlight.js style is available."""
    if self.highlight_style != 'disable':
      avail = (self.highlight_style in MatisseConfig.__highlight_styles)
      if not avail:
        sys.stderr.write("Error: the selected highlight.js style '" + self.highlight_style + "' is not available")
        sys.stderr.write("\nRestore the default value 'github.css'\n")
        self.highlight_style = 'github.css'
        sys.stderr.write(self.str_highlight_styles())
    else:
      avail = False
      self.highlight = False
    return avail

  def __check_theme(self):
    """Check if the selected builtin theme is available."""
    avail = False
    if self.theme:
      avail = (self.theme in MatisseConfig.__themes)
      if not avail:
        self.theme = None
        sys.stderr.write("Error: the selected builtin theme '" + self.theme + "' is not available")
        sys.stderr.write(self.str_themes())
    return avail

  def set_highlight_style(self, style):
    """Set highlight.js style performing availability check.

    Parameters
    ----------
    style : str
      style file name
    """
    self.highlight_style = style
    self.__check_highlight_style()
    return

  def set_theme(self, theme):
    """Set builtin theme performing availability check.

    Parameters
    ----------
    theme : str
      theme file name
    """
    self.theme = theme
    self.__check_theme()
    return

  def put_theme(self, source, output):
    """Put builtin theme into the source.

    Must be called after the output tree has been made.

    Parameters
    ----------
    source : str
      source of presentation
    output: str
      output path

    Returns
    -------
    str
      source of presentation with theme included
    """
    source_themed = source
    if self.theme:
      themes = os.path.join(os.path.dirname(__file__), 'utils/builtin_themes')
      for theme in os.listdir(themes):
        if theme == self.theme:
          theme_path = os.path.join(os.path.join(themes, theme), 'theme.yaml')
          if os.path.exists(theme_path):
            sync_logger = logging.getLogger('sync_logger')
            sync(os.path.join(themes, theme), 'theme-' + theme, 'sync', create=True, logger=sync_logger)
            source_themed = r'$include(' + os.path.join('theme-' + theme, 'theme.yaml') + ')\n' + source_themed
            metadata_path = os.path.join(os.path.join(themes, theme), 'metadata.yaml')
            if os.path.exists(metadata_path):
              source_themed = r'$include(' + os.path.join('theme-' + theme, 'metadata.yaml') + ')\n' + source_themed
            titlepage_path = os.path.join(os.path.join(themes, theme), 'titlepage.md')
            if os.path.exists(titlepage_path):
              source_themed = r'$include(' + os.path.join('theme-' + theme, 'titlepage.md') + ')\n' + source_themed
    return source_themed

  def str_highlight_styles(self):
    """Stringify the available highlight.js styles.

    Returns
    -------
    str
      string containing the list of available styles
    """
    string = ['Available highlight.js styles']
    for style in sorted(self.__highlight_styles):
      string.append(style)
    return '\n  '.join(string) + '\n'

  def str_themes(self):
    """Stringify the builtin themes.

    Returns
    -------
    str
      string containing the list of builtin themes
    """
    string = ['Builtin themes']
    for theme in sorted(self.__themes):
      string.append(theme)
    return '\n  '.join(string) + '\n'

  def update(self, cliargs):
    """Update config state from command line arguments.

    Parameters
    ----------
    cliargs : argparse parsed object
      command line arguments parsed
    """
    self.verbose = cliargs.verbose
    self.online_mathjax = cliargs.online_MathJax
    self.set_highlight_style(style=cliargs.highlight_style)
    self.set_theme(theme=cliargs.theme)
    self.toc_at_chap_beginning = cliargs.toc_at_chap_beginning
    self.toc_at_sec_beginning = cliargs.toc_at_sec_beginning
    self.toc_at_subsec_beginning = cliargs.toc_at_subsec_beginning
    self.pdf = cliargs.pdf
    self.print_parsed_source = cliargs.print_parsed_source
    return

  def printf(self):
    """Print config data with verbosity check."""
    if self.verbose:
      print(self)
    return

  def make_output_tree(self, output):
    """
    Create output tree and copy MaTiSSe.py assets.

    Parameters
    ----------
    output: str
      output path
    """
    # checking output directory
    if not os.path.exists(output):
      os.makedirs(output)
    # creating css directory
    if not os.path.exists(os.path.join(output, 'css')):
      os.makedirs(os.path.join(output, 'css'))
    # normalize.css
    css = os.path.join(os.path.dirname(__file__), 'utils/css/normalize.css')
    copyfile(css, os.path.join(output, 'css/normalize.css'))
    css = os.path.join(os.path.dirname(__file__), 'utils/css/matisse_defaults.css')
    copyfile(css, os.path.join(output, 'css/matisse_defaults.css'))
    css = os.path.join(os.path.dirname(__file__), 'utils/css/matisse_defaults_printing.css')
    copyfile(css, os.path.join(output, 'css/matisse_defaults_printing.css'))
    # creating jscript directory
    if not os.path.exists(os.path.join(output, 'js')):
      os.makedirs(os.path.join(output, 'js'))
    # MathJax engine
    if not self.online_mathjax:
      if os.path.exists(os.path.join(output, 'js/MathJax')):
        rmtree(os.path.join(output, 'js/MathJax'))
      jscript = os.path.join(os.path.dirname(__file__), 'utils/js/MathJax')
      copytree(jscript, os.path.join(output, 'js/MathJax'))
    # highlight.js
    if self.highlight:
      if os.path.exists(os.path.join(output, 'js/highlight')):
        rmtree(os.path.join(output, 'js/highlight'))
      jscript = os.path.join(os.path.dirname(__file__), 'utils/js/highlight')
      copytree(jscript, os.path.join(output, 'js/highlight'))
    # countDown.js
    jscript = os.path.join(os.path.dirname(__file__), 'utils/js/countDown.js')
    copyfile(jscript, os.path.join(output, 'js/countDown.js'))
    # impress.js
    jscript = os.path.join(os.path.dirname(__file__), 'utils/js/impress/impress.js')
    copyfile(jscript, os.path.join(output, 'js/impress.js'))
    return
