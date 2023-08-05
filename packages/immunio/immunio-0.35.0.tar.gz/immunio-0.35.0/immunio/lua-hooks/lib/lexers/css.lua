-- Copyright 2006-2010 Mitchell Foral mitchell<att>caladbolg.net. See LICENSE.
-- CSS LPeg lexer
local M = {_NAME = 'css'}

local l = require('lexer')
local token, parent_token, word_match, delimited_range =
  l.token, l.parent_token, l.word_match, l.delimited_range

local P, R, S, V = lpeg.P, lpeg.R, lpeg.S, lpeg.V

local ws = token('whitespace', l.space^1)

-- comments
local comment = token('comment', '/*' * (l.any - '*/')^0 * P('*/')^-1)

local word_char = l.alnum + S('_-')
local identifier = (l.alpha + '-')^1 * word_char^0

-- strings
local sq_str = delimited_range("'", '\\', true)
local dq_str = delimited_range('"', '\\', true)
local string = token('string', sq_str + dq_str)

local colon = token('operator', ':')
local semicolon = token('operator', ';')
local comma = token('operator', ',')
local obrace = token('operator', '{')
local cbrace = token('operator', '}')
local bang = token('operator', '!')

-- selectors
local attribute = '[' * word_char^1 * (S('|~')^-1 * '=' * (identifier + sq_str + dq_str))^-1 * ']'
local class_id_selector = identifier^-1 * S('.#') * identifier
local pseudoclass = word_match({
  'first-letter', 'first-line', 'link', 'active', 'visited',
  'first-child', 'focus', 'hover', 'lang', 'before', 'after',
  'left', 'right', 'first'
}, '-', true)
local selector = P('*') * ws + (class_id_selector + identifier + '*') * attribute^-1
selector =  token('selector', selector * (ws * selector)^0) *
  (token('selector', ':' * pseudoclass) + token('default_selector', ':' * word_char^1))^-1
selector = selector * (ws^0 * (comma + token('selector', S('>+*'))) * ws^0 * selector)^0

-- css properties and values
local property_name = token('property_name', word_char^1)
local value = token('value', bang^0 * word_char^1)

-- colors, units, numbers, and urls
local hexcolor = token('color', '#' * l.xdigit * l.xdigit * l.xdigit * (l.xdigit * l.xdigit * l.xdigit)^-1)
local rgbunit = (l.digit^1 * P('%')^-1)
local rgbcolor = token('color', word_match({'rgb'}, nil, true) * '(' * rgbunit * ',' * rgbunit * ',' * rgbunit * ')')
local color = hexcolor + rgbcolor
local unit = word_match({
  'pt', 'mm', 'cm', 'pc', 'in', 'px', 'em', 'ex', 'deg',
  'rad', 'grad', 'ms', 's', 'Hz', 'kHz'
}, nil, true)
unit = token('unit', unit + '%')
local css_float = l.digit^0 * '.' * l.digit^1 + l.digit^1 * '.' * l.digit^0 + l.digit^1
local number = token('number', S('+-')^-1 * css_float) * unit^-1
local func = parent_token('function', token('function_name', identifier) * token('function_param', delimited_range('()', true, false, true)))
-- declaration block
local block_default_char = token('default_block_char', (l.any - '}')^1)
local property_value = parent_token('property_value', string + number + color + func + value)
local property_values = { property_value * (ws * property_value)^0 * (ws^0 * comma * ws^0 * V(1))^0 }
local declaration_value = colon * ws^0 * property_values * ws^0 * semicolon^0
local declaration_property = property_name * ws^0
local declaration = parent_token('declaration', (declaration_property * (declaration_value + block_default_char)) + comment + block_default_char)
local declaration_block = parent_token('declaration_block', obrace * ws^0 * declaration * (ws * declaration)^0 * ws^0 * cbrace^-1)

local css_element = selector * ws^0 * declaration_block^-1

-- at rules
local at_rule_name = token('at_rule_name', '@' * word_match({
  'import', 'media', 'page', 'font-face', 'charset'
}, '-', true))
local at_rule_arg = token('at_rule_arg', word_match({
  'all', 'aural', 'braille', 'embossed', 'handheld', 'print',
  'projection', 'screen', 'tty', 'tv'
}, nil, true))
local at_rule = parent_token('at_rule', at_rule_name * (ws * (at_rule_arg + func + string) )^-1)

-- Immunio marker
local marker = l.token('marker', P('{immunio-var:') * l.integer * ':' * l.xdigit^1 * '}')

M._rules = {
  {'whitespace', ws},
  {'comment', comment},
  {'marker', marker},
  {'at_rule', at_rule},
  {'string', string},
  {'css_element', css_element},
}
M.declaration = declaration -- so we can access it in sub-lexer for attrs

M._tokenstyles = {
}

M._foldsymbols = {
}

return M
