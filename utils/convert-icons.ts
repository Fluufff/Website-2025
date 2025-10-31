import { SVG, blankIconSet, cleanupSVG, runSVGO } from '@iconify/tools'

const iconSet = blankIconSet('')
const txt = await Deno.readTextFile('./utils/line-rounded-icon-font.svg')
const regex = /<glyph glyph-name="(\w*)" unicode="&#x\w+;" d="(.*)" horiz-adv-x="(.*)" \/>/g

for (const match of txt.matchAll(regex)) {
  const horiz = parseInt(match[3])
  const viewBox = `${1000 - horiz} 0 ${horiz} 1000`
  const svg = new SVG(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><path transform="rotate(180) translate(-1000, -850)" d="${match[2]}" fill="currentColor"/></svg>`
  )
  cleanupSVG(svg)
  runSVGO(svg)

  iconSet.fromSVG(match[1]!, svg)
}

const exported = JSON.stringify(iconSet.export(), null, '\t') + '\n'
await Deno.writeTextFile('./src/assets/icons.json', exported)
