import { SVG, blankIconSet, cleanupSVG, runSVGO, parseColors, cleanupInlineStyle, isEmptyColor } from '@iconify/tools'

const iconSet = blankIconSet('')

for await (const file of Deno.readDir('./utils/Line Rounded')) {
  const svgText = await Deno.readTextFile(`./utils/Line Rounded/${file.name}`)
  const svg = new SVG(svgText)
  cleanupSVG(svg)
  cleanupInlineStyle(svg)
  parseColors(svg, {
    defaultColor: 'currentColor',
    callback: (_attr, colorStr, color) => {
      return !color || isEmptyColor(color) ? colorStr : 'currentColor'
    }
  })
  runSVGO(svg)

  const iconName = file.name.replace('.svg', '').replace(' ', '-').toLowerCase()
  iconSet.fromSVG(iconName, svg)
}

const exported = JSON.stringify(iconSet.export(), null, '\t') + '\n'
await Deno.writeTextFile('./src/assets/icons.json', exported)
