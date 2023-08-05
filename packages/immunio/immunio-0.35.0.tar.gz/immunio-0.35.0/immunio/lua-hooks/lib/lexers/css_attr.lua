-- Lexer for CSS style attributes. These are slightly different as we need to
-- start lexing inside a declaration rather than at the selector level...
M = require('css')
-- For attributes, remove the css_element rule which includes
-- selector and delaration block tokens
for k,v in ipairs(M._rules) do
	if v[1] == 'css_element' then
		M._rules[k] = nil
	end
end
-- Instead insert a top level token for declarations.
table.insert(M._rules, {'declaration', M.declaration})
return M