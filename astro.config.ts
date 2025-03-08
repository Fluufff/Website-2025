import { defineConfig, envField } from 'astro/config'
/// <reference types="deno" />

// https://astro.build/config
export default defineConfig({
  site: Deno.env.get('SITE'),
  base: Deno.env.get('SITE_BASE_URL'),

  env: {
    schema: {
      SITE_BASE_URL: envField.string({
        context: 'server',
        access: 'public',
        endsWith: '/',
      })
    }
  }
})
