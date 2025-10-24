import type { Loader, LoaderContext } from 'astro/loaders'
import { z } from 'astro:content'
import qs from 'qs'

export interface Options {
  uri: string
  token: string
}

export function rolesLoader({ uri, token }: Options): Loader {
  return {
    name: 'hr-roles-loader',
    async load(ctx: LoaderContext) {
      ctx.store.clear()

      const url = new URL('hr-roles', uri)
      url.search = qs.stringify({ populate: 'hr_department' })
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error(`Fetch failed (${response.statusText}): ${await response.text()}`)
      const items = (await response.json()).data

      for (const item of items) {
        const slug = item.hr_department.slug + '-' + item.slug
        const data = await ctx.parseData({
          id: slug,
          data: { ...item, slug, department_name: item.hr_department.name }
        })

        ctx.store.set({
          id: slug,
          data: {
            ...data,
            introduction_rendered: await ctx.renderMarkdown(data.introduction),
            extra_description_rendered: data.extra_description
              ? await ctx.renderMarkdown(data.extra_description)
              : null,
            call_to_action_rendered: data.call_to_action ? await ctx.renderMarkdown(data.call_to_action) : null
          }
        })
      }
    },
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      apply_form_url: z.string(),
      work_model: z.string(),
      department_name: z.string(),
      open_for_applications: z.boolean(),
      extra_description: z.string().nullable(),
      introduction: z.string(),
      call_to_action: z.string().nullable()
    })
  }
}
