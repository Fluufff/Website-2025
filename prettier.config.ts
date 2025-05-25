export default {
  trailingComma: 'none',
  singleQuote: true,
  semi: false,
  printWidth: 120,

  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}
