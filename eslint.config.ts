import js from '@eslint/js'
import ts from 'typescript-eslint'
import astro from 'eslint-plugin-astro'

export default ts.config(
  js.configs.recommended,
  ts.configs.recommended,
  astro.configs.recommended,
  { ignores: ['.astro'] }
)
