import type { CollectionEntry } from 'astro:content'

export type StaffRole = CollectionEntry<'staffRoles'>['data']

export function getPageId(role: StaffRole) {
  function slugize(str: string) {
    return str.trim().replace(/\s/g, '-').toLowerCase()
  }

  return slugize(role.department) + '-' + slugize(role.name)
}
