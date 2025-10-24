import { defineCollection } from 'astro:content'
import { rolesLoader } from './hr-roles-loader.ts'
import { loadEnv } from 'vite'
import process from 'node:process'

const { STRAPI_URI, STRAPI_TOKEN } = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '')

export const collections = {
  staffRoles: defineCollection({
    loader: rolesLoader({
      uri: STRAPI_URI!,
      token: STRAPI_TOKEN!
    })
  })
}
