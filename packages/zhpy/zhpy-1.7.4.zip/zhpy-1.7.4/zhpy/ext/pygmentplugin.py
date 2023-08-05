#coding=utf-8

import re
try:
    set
except NameError:
    from sets import Set as set

#from pygments.lexers.agile import PythonLexer
from pygments.lexer import Lexer, RegexLexer, ExtendedRegexLexer, \
    LexerContext, include, combined, do_insertions, bygroups, using
from pygments.token import Error, Text, \
    Comment, Operator, Keyword, Name, String, Number, Generic, Punctuation
from pygments.util import get_bool_opt, get_list_opt, shebang_matches
from pygments import unistring as uni

from pygments.lexers.functional import SchemeLexer

line_re  = re.compile('.*?\n')

class ZhpyLexer(RegexLexer):
    """
    for zhpy <zhpy.googlecode.com> source code
    """
    name = "Zhpy"
    aliases = ['zhpy']
    filenames = ['*.twpy', '*.cnpy', '*.py']
    
    tokens = {
        'root': [
            (r'\n', Text),
            (r'^(\s*)("""(?:.|\n)*?""")', bygroups(Text, String.Doc)), #docstring
            (r"^(\s*)('''(?:.|\n)*?''')", bygroups(Text, String.Doc)), #docstring
            (r'[^\S\n]+', Text),
            (r'#.*$', Comment), #comment
            (r'[]{}:(),;[]', Punctuation),
            (r'\\\n', Text),
            (r'\\', Text),
            (r'(in|is|and|or|not)\b', Operator.Word),
            (r'!=|==|<<|>>|[-~+/*%=<>&^|.]', Operator),
            include('keywords'),
            (r'(def)(\s+)', bygroups(Keyword, Text), 'funcname'),
            (r'(class)(\s+)', bygroups(Keyword, Text), 'classname'),
            (r'(from)(\s+)', bygroups(Keyword, Text), 'fromimport'),
            (r'(import)(\s+)', bygroups(Keyword, Text), 'import'),
            include('builtins'),
            include('backtick'),
            ('(?:[rR]|[uU][rR]|[rR][uU])"""', String, 'tdqs'),
            ("(?:[rR]|[uU][rR]|[rR][uU])'''", String, 'tsqs'),
            ('(?:[rR]|[uU][rR]|[rR][uU])"', String, 'dqs'),
            ("(?:[rR]|[uU][rR]|[rR][uU])'", String, 'sqs'),
            ('[uU]?"""', String, combined('stringescape', 'tdqs')),
            ("[uU]?'''", String, combined('stringescape', 'tsqs')),
            ('[uU]?"', String, combined('stringescape', 'dqs')),
            ("[uU]?'", String, combined('stringescape', 'sqs')),
            include('name'),
            include('numbers'),
        ],
        'keywords': [
            (r'(assert|break|continue|del|elif|else|except|exec|'
            r'finally|for|global|if|lambda|pass|print|raise|'
            r'return|try|while|yield|as|with|'
            r'印出|輸入)\b', Keyword),
        ],
        'builtins': [
            (r'(?<!\.)(__import__|abs|apply|basestring|bool|buffer|callable|'
            r'chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|'
            r'divmod|enumerate|eval|execfile|exit|file|filter|float|getattr|'
            r'globals|hasattr|hash|hex|id|input|int|intern|isinstance|'
            r'issubclass|iter|len|list|locals|long|map|max|min|object|oct|'
            r'open|ord|pow|property|range|raw_input|reduce|reload|repr|'
            r'round|setattr|slice|staticmethod|str|sum|super|tuple|type|'
            r'unichr|unicode|vars|xrange|zip)\b', Name.Builtin),
           (r'(?<!\.)(self|None|Ellipsis|NotImplemented|False|True'
            r')\b', Name.Builtin.Pseudo),
           (r'(?<!\.)(ArithmeticError|AssertionError|AttributeError|'
            r'BaseException|DeprecationWarning|EOFError|EnvironmentError|'
            r'Exception|FloatingPointError|FutureWarning|GeneratorExit|IOError|'
            r'ImportError|ImportWarning|IndentationError|IndexError|KeyError|'
            r'KeyboardInterrupt|LookupError|MemoryError|NameError|'
            r'NotImplemented|NotImplementedError|OSError|OverflowError|'
            r'OverflowWarning|PendingDeprecationWarning|ReferenceError|'
            r'RuntimeError|RuntimeWarning|StandardError|StopIteration|'
            r'SyntaxError|SyntaxWarning|SystemError|SystemExit|TabError|'
            r'TypeError|UnboundLocalError|UnicodeDecodeError|'
            r'UnicodeEncodeError|UnicodeError|UnicodeTranslateError|'
            r'UnicodeWarning|UserWarning|ValueError|Warning|ZeroDivisionError'
            r')\b', Name.Exception),
        ],
        'numbers': [
            (r'(\d+\.?\d*|\d*\.\d+)([eE][+-]?[0-9]+)?', Number.Float),
            (r'0\d+', Number.Oct),
            (r'0[xX][a-fA-F0-9]+', Number.Hex),
            (r'\d+L', Number.Integer.Long),
            (r'\d+', Number.Integer)
        ],
        'backtick': [
            ('`.*?`', String.Backtick),
        ],
        'name': [
            (r'@[a-zA-Z0-9_]+', Name.Decorator),
            ('[a-zA-Z_][a-zA-Z0-9_u"\u0080-\ufe01]*', Name),
        ],
        'funcname': [
            ('[a-zA-Z_][a-zA-Z0-9_\u0080-\ufe01]*', Name.Function, '#pop')
        ],
        'classname': [
            ('[a-zA-Z_][a-zA-Z0-9_\u0080-\ufe01]*', Name.Class, '#pop')
        ],
        'import': [
            (r'(\s+)(as)(\s+)', bygroups(Text, Keyword, Text)),
            (r'[a-zA-Z_][a-zA-Z0-9_.\u0080-\ufe01]*', Name.Namespace),
            (r'(\s*)(,)(\s*)', bygroups(Text, Operator, Text)),
            (r'', Text, '#pop') # all else: go back
        ],
        'fromimport': [
            (r'(\s+)(import)\b', bygroups(Text, Keyword), '#pop'),
            (r'[a-zA-Z_.][a-zA-Z0-9_.]*', Name.Namespace),
        ],
         'stringescape': [
            (r'\\([\\abfnrtv"\']|\n|N{.*?}|u[a-fA-F0-9]{4}|'
            r'U[a-fA-F0-9\u0080-\ufe01]{8}|x[a-fA-F0-9\u0080-\ufe01]{2}|[0-7]{1,3})', String.Escape)
        ],
        'strings': [
            (r'%(\([a-zA-Z0-9\u0080-\ufe01]+\))?[-#0 +]*([0-9]+|[*])?(\.([0-9]+|[*]))?'
            '[hlL]?[diouxXeEfFgGcrs%]', String.Interpol),
            (r'[^\\\'"%\n]+', String),
            # quotes, percents and backslashes must be parsed one at a time
            (r'[\'"\\]', String),
            # unhandled string formatting sign
            (r'%', String)
            # newlines are an error (use "nl" state)
        ],
        'nl': [
            (r'\n', String)
        ],
        'dqs': [
            (r'"', String, '#pop'),
            (r'\\\\|\\"|\\\n', String.Escape), # included here again for raw strings
            include('strings')
        ],
        'sqs': [
            (r"'", String, '#pop'),
            (r"\\\\|\\'|\\\n", String.Escape), # included here again for raw strings
            include('strings')
        ],
        'tdqs': [
            (r'"""', String, '#pop'),
            include('strings'),
            include('nl')
        ],
        'tsqs': [
            (r"'''", String, '#pop'),
            include('strings'),
            include('nl')
        ],
    }
    
    def analyse_text(text):
        return shebang_matches(text, r'pythonw?(2\.\d)?')