import { defineConfig, envField, fontProviders } from 'astro/config'
import icon from 'astro-icon'
import vue from '@astrojs/vue'
/// <reference types="deno" />

// https://astro.build/config
export default defineConfig({
  site: Deno.env.get('SITE'),
  base: Deno.env.get('SITE_BASE_URL'),
  integrations: [icon(), vue()],

  env: {
    schema: {
      SITE_BASE_URL: envField.string({
        context: 'server',
        access: 'public',
        endsWith: '/'
      })
    }
  },

  experimental: {
    fonts: [
      {
        name: 'Inter',
        provider: fontProviders.google(),
        cssVariable: '--font-inter',
        weights: [400, 600, 700],
        subsets: ['latin'],
        styles: ['normal']
      },
      {
        name: 'Gatsby Gilmour',
        provider: 'local',
        cssVariable: '--font-gatsby',
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: [
              './src/assets/fonts/gatsby_gilmour/GatsbyGilmour-Regular.woff2',
              './src/assets/fonts/gatsby_gilmour/GatsbyGilmour-Regular.woff'
            ]
          }
        ]
      }
    ]
  }
})
