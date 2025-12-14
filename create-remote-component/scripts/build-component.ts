import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import pxToViewport from 'postcss-px-to-viewport-8-plugin'


const __dirname = fileURLToPath(new URL('.', import.meta.url))

const componentList = process.argv.slice(2)
// console.log(__dirname, process.argv, componentList)

const getConponentConfig = (componentName: string) => {
  try {
    const config = readFileSync(path.resolve(__dirname, `../packages/${toKebabCase(componentName)}/config.json`), 'utf-8')
    return JSON.parse(config)
  } catch (error) {
    console.log(`组件${componentName}没有配置文件，请检查文件是否存在，已退出构建`)
    return process.exit(1)
  }
}

const toKebabCase = (str: string) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
}


const buildFactory = async (componentName: string, platform: 'pc' | 'h5') => {
  const componentConfig = getConponentConfig(componentName)
  if (!componentConfig.version) {
    console.log(`组件${componentName}没有版本号，跳过构建`)
    return
  }
  if (componentConfig.name !== componentName) {
    console.log(`组件${componentName}的配置文件中name为${componentConfig.name}，与组件名不一致，跳过构建`)
    return
  }
  console.log('=='.repeat(30))
  console.log(`开始构建组件【${componentName}】，${platform}端，版本号为${componentConfig.version}`)
  try {
    await build({
      publicDir: false,
      css: {
        postcss: {
          plugins: platform === 'h5' ? [
            pxToViewport({
              viewportWidth: 375,
              unitPrecision: 5,
              viewportUnit: 'vw',
              selectorBlackList: [],
              minPixelValue: 1
            })
          ] : []
        }
      },
      plugins: [
        vue({
          customElement: true
        })
      ],
      build: {
        outDir: path.resolve(__dirname, `../lib/${toKebabCase(componentName)}`),
        lib: {
          entry: path.resolve(__dirname, `../packages/${toKebabCase(componentName)}/index.ts`),
          name: componentName,
          formats: ['umd'],
          // fileName: () => `${componentName}_${componentConfig.version}_[hash]_${platform}.js`
          fileName: () => `${componentName}_${componentConfig.version}_${platform}.js`
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            }
          }
        },
        emptyOutDir: false
      }
    })
    console.log(`✅ 组件【${componentName}】${platform}端构建完成`)
    console.log('=='.repeat(30))
  } catch (error) {
     console.error(`❌ 组件【${componentName}】${platform}端构建失败:`, error)
    return process.exit(1)
  }
}

const startBuild = async () => {
  if (componentList.length === 0) {
    console.log('请输入要构建的组件名！！！')
    return
  }
  for (const componentName of componentList) {
    await buildFactory(componentName, 'pc')
    await buildFactory(componentName, 'h5')
  }
}
startBuild()