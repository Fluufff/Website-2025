import js from '@eslint/js'
import ts from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  js.configs.recommended,
  ts.configs.recommended,
  astro.configs.recommended,
  {
    ignores: ['.astro', 'dist']
  },
  {
    rules: {
      'no-undef': 'off' // Handled by TypeScript
    }
  }
)
