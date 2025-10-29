import iconSet from '../src/assets/icons.json'

import { iconToSVG } from '@iconify/utils'
import { getIconData } from '@iconify/utils/lib/icon-set/get-icon'
import { defaultIconCustomisations } from '@iconify/utils/lib/customisations/defaults'

export default function (iconName: string) {
  const iconData = getIconData(iconSet, iconName)
  if (!iconData) return undefined

  const { attributes, body } = iconToSVG(iconData, {
    ...defaultIconCustomisations,
    height: '1em',
    width: '1em'
  })
  return `<svg ${Object.entries(attributes)
    .map((i) => `${i[0]}="${i[1]}"`)
    .join(' ')}>${body}</svg>`
}
