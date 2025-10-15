import { defineCollection, z } from 'astro:content'
import { type Loader, type LoaderContext } from 'astro/loaders'

import { existsSync, promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { type StaffRole } from './data/hr/staff_roles.ts'

function staffRoleLoader(): Loader {
  const fileName = './src/data/hr/staff_roles.json'
  async function loadData(filePath: string, context: LoaderContext) {
    const raw = await fs.readFile(filePath, 'utf8')
    const parsed: StaffRole[] = JSON.parse(raw.trim())

    context.store.clear()
    for (const item of parsed) {
      context.store.set({
        id: item.id,

        data: {
          ...item,
          descriptionRendered: (await context.renderMarkdown(item.description)).html
        }
      })
    }
  }

  return {
    name: 'staff-roles-loader',
    async load(context: LoaderContext) {
      const url = new URL(fileName, context.config.root)
      if (!existsSync(url)) {
        context.logger.error(`File not found: ${fileName}`)
        return
      }

      const filePath = fileURLToPath(url)
      await loadData(filePath, context)
      context.watcher?.add(filePath)
      context.watcher?.on('change', async (changedPath) => {
        if (changedPath === filePath) {
          context.logger.info(`Reloading data from ${fileName}`)
          await loadData(filePath, context)
        }
      })
    }
  }
}

const staffRoles = defineCollection({
  loader: staffRoleLoader(),
  schema: z.object({
    workmodel: z.string(), // TODO: enum
    department: z.string(),
    description: z.string(),
    descriptionRendered: z.string(),
    name: z.string(),
    id: z.string(),
    apply_form_url: z.string(),
    open: z.boolean()
  })
})

export const collections = { staffRoles }
