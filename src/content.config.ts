import { defineCollection } from 'astro:content'
import { rolesLoader } from './hr-roles-loader.ts'
import { loadEnv } from 'vite'
import process from 'node:process'
import {
  scheduleOpenLocationLoader,
  scheduleTagLoader,
  scheduleLocationLoader,
  scheduleEventLoader
} from './schedule-loader.ts'

const { STRAPI_URI, STRAPI_TOKEN } = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '')

const strapiOptions = { uri: STRAPI_URI!, token: STRAPI_TOKEN! }

export const collections = {
  staffRoles: defineCollection({ loader: rolesLoader(strapiOptions) }),
  scheduleOpenLocations: defineCollection({ loader: scheduleOpenLocationLoader(strapiOptions) }),
  scheduleLocations: defineCollection({ loader: scheduleLocationLoader(strapiOptions) }),
  scheduleEvents: defineCollection({ loader: scheduleEventLoader(strapiOptions) }),
  scheduleTags: defineCollection({ loader: scheduleTagLoader(strapiOptions) })
}
