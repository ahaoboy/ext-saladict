const path = require('path')
const fs = require('fs')

const ROOT = path.resolve(__dirname, '.')
const BUILD_DIR = path.resolve(ROOT, '../build')

function updateContent(assDir, man) {
  const css = []
  const js = ["assets/browser-polyfill.min.js"]

  for (const i of fs.readdirSync(assDir)) {

    const isCss = /^content(?:\.[a-f0-9]+)?\.css$/.test(i)
    const isJs = [
      /^runtime(?:\.[a-f0-9]+)?\.js$/,
      /^view-vendor(?:\.[a-f0-9]+)?\.js$/,
      /^content(?:\.[a-f0-9]+)?\.js$/,
    ].some(re => re.test(i))
    console.log('  found', i, isCss, isJs)
    if (isCss) {
      css.push(`assets/${i}`)
    } else if (isJs) {
      js.push(`assets/${i}`)
    }

    man['content_scripts'][0].css = css
    man['content_scripts'][0].js = js
  }
}

function updateBackground(assDir, man) {
  const js = ["browser-polyfill.min.js"]

  for (const i of fs.readdirSync(assDir)) {
    const isCss = /^content(?:\.[a-f0-9]+)?\.css$/.test(i)
    const isJs = [
      /^runtime(?:\.[a-f0-9]+)?\.js$/,
      /^view-vendor(?:\.[a-f0-9]+)?\.js$/,
      /^franc(?:\.[a-f0-9]+)?\.js$/,
      /^dexie(?:\.[a-f0-9]+)?\.js$/,
      /^background(?:\.[a-f0-9]+)?\.js$/,
    ].some(re => re.test(i))
    console.log('  found', i, isCss, isJs)
    if (isJs) {
      js.push(`${i}`)
    }

    man['background'] = {
      "service_worker": "assets/background.js"
    }

    const bgPath = path.resolve(assDir, 'background.js')

    const code = js.map(i => `try {importScripts('${i}')} catch(e) {console.error(e)}`)
      .join("\n")

    fs.writeFileSync(bgPath, code)
  }
}


function updateSection(assDir, man) {
  const css = []
  const js = ["assets/browser-polyfill.min.js"]

  for (const i of fs.readdirSync(assDir)) {

    const isCss = /^content(?:\.[a-f0-9]+)?\.css$/.test(i)
    const isJs = [
      /^runtime(?:\.[a-f0-9]+)?\.js$/,
      /^view-vendor(?:\.[a-f0-9]+)?\.js$/,
      /^franc(?:\.[a-f0-9]+)?\.js$/,
      /^selection(?:\.[a-f0-9]+)?\.js$/,
    ].some(re => re.test(i))
    console.log('  found', i, isCss, isJs)
    if (isCss) {
      css.push(`assets/${i}`)
    } else if (isJs) {
      js.push(`assets/${i}`)
    }

    man['content_scripts'][1].css = css
    man['content_scripts'][1].js = js
  }
}

for (const i of fs.readdirSync(BUILD_DIR)) {
  const browserDir = path.resolve(BUILD_DIR, i)
  console.log(browserDir)
  if (fs.statSync(browserDir).isDirectory()) {
    const manifestPath = path.resolve(browserDir, 'manifest.json')
    console.log(manifestPath)
    if (fs.existsSync(manifestPath)) {
      const manifest = require(manifestPath)
      const ASSETS_DIR = path.resolve(browserDir, 'assets')

      updateContent(ASSETS_DIR, manifest)
      updateSection(ASSETS_DIR, manifest)
      updateBackground(ASSETS_DIR, manifest)

      // FIXME: temp fix for edge
      manifest['content_scripts'] = manifest['content_scripts'].slice(0, 2)
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
      console.log(`Updated ${manifestPath}`)
    }
  }
}