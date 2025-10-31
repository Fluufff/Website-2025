import type { Loader, LoaderContext } from 'astro/loaders'
import { z } from 'astro:content'
import qs from 'qs'

export interface Options {
  uri: string
  token: string
}

export function scheduleOpenLocationLoader({ uri, token }: Options): Loader {
  return {
    name: 'schedule-open-locations-loader',
    async load(ctx: LoaderContext) {
      ctx.store.clear()

      const items = await loadStrapi(uri, token, 'schedule-open-locations', { populate: 'opening_times' })

      for (const item of items) {
        const data = await ctx.parseData({
          id: item.documentId,
          data: { ...item }
        })

        ctx.store.set({ id: item.documentId, data })
      }
    },
    schema: z.object({
      name: z.string(),
      opening_times: z.array(
        z.object({
          day: z.string(),
          start_time: z.string(),
          end_time: z.string()
        })
      )
    })
  }
}

export function scheduleTagLoader({ uri, token }: Options): Loader {
  return {
    name: 'schedule-tag-loader',
    async load(ctx: LoaderContext) {
      ctx.store.clear()

      const items = await loadStrapi(uri, token, 'schedule-tags')

      for (const item of items) {
        const data = await ctx.parseData({
          id: item.id.toString(),
          data: { ...item }
        })

        ctx.store.set({ id: item.id.toString(), data })
      }
    },
    schema: z.object({
      id: z.number(),
      name: z.string(),
      emoji: z.string()
    })
  }
}

export function scheduleLocationLoader({ uri, token }: Options): Loader {
  return {
    name: 'schedule-location-loader',
    async load(ctx: LoaderContext) {
      ctx.store.clear()

      const items = await loadStrapi(uri, token, 'schedule-locations')

      for (const item of items) {
        const data = await ctx.parseData({
          id: item.id.toString(),
          data: { ...item }
        })

        ctx.store.set({ id: item.id.toString(), data })
      }
    },
    schema: z.object({
      id: z.number(),
      name: z.string()
    })
  }
}

export function scheduleEventLoader({ uri, token }: Options): Loader {
  return {
    name: 'schedule-event-loader',
    async load(ctx: LoaderContext) {
      ctx.store.clear()

      const items = await loadStrapi(uri, token, 'schedule-events', {
        populate: { schedule_location: { fields: ['id'] }, schedule_tags: { fields: ['id'] } },
        pagination: { pageSize: 50 }
      })

      for (const item of items) {
        const data = await ctx.parseData({
          id: item.id.toString(),
          data: { ...item }
        })

        ctx.store.set({ id: item.id.toString(), data, rendered: await ctx.renderMarkdown(data.description) })
      }
    },
    schema: z.object({
      title: z.string(),
      day: z.string(),
      start_time: z.string(),
      end_time: z.string(),
      description: z.string(),
      host_name: z.string().nullable(),
      schedule_location: z.object({ id: z.number() }),
      schedule_tags: z.array(z.object({ id: z.number() }))
    })
  }
}

async function loadStrapi(uri: string, token: string, item: string, options?: object) {
  const url = new URL(item, uri)
  if (options) url.search = qs.stringify(options)
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!response.ok) throw new Error(`Fetch failed (${response.statusText}): ${await response.text()}`)
  return (await response.json()).data
}
