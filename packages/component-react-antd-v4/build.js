const fs = require('fs')
// const rollup = require('rollup')
// const { uglify } = require('rollup-plugin-uglify')
// const babel = require('rollup-plugin-babel')

// import { uglify } from 'rollup-plugin-uglify'
// import babel from 'rollup-plugin-babel'
// import resolve from 'rollup-plugin-node-resolve'

const rootPath = 'src/'
const distPath = 'esm/'

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath)
}

const dirs = fs.readdirSync(rootPath)
.filter(d => !d.startsWith('_'))
.filter(d => fs.lstatSync(rootPath + d).isDirectory())

const files = []

dirs.forEach(dir => {
  const filename = dir + '/index.css'
  
  try {
    const file = fs.readFileSync(rootPath + filename)
    files.push(file)
    fs.writeFileSync(distPath + filename, file)
  }
  catch (e) {
    // 没有 css 
    // 或者写入失败
  }
})

const styleFile = Buffer.concat(files)
fs.writeFileSync(distPath + 'index.css', styleFile)


// const configs = dirs.map(dir => {
//   return {
//     inputOptions: {
//       input: rootPath + dir + '/index.ts',
//       external: [ 'react', 'antd' ],
//       plugins: [
//         babel(),
//         uglify(), 
//       ]
//     },
//     outputOptions: {
//       file: distPath + dir + '/index.js',
//       format: 'es'
//     },
//   }
// })


// configs.reduce(async (last, conf) => {

//   await last

//   const bundle = await rollup.rollup(conf.inputOptions)

//   console.log(bundle.imports) // an array of external dependencies
//   console.log(bundle.exports) // an array of names exported by the entry point
//   console.log(bundle.modules) // an array of module objects

//   // generate code and a sourcemap
//   const { code, map } = await bundle.generate(conf.outputOptions)

//   // or write the bundle to disk
//   return bundle.write(outputOptions)


// }, Promise.resolve())


// const configMap = {
//   umd: {
//     file: 'dist/index.js',
//     format: 'umd'
//   },
// }

// export default ['umd'].map(k => {
//   const conf = configMap[k]

//   return {
//     input: 'esm/index.js',
//     output: {
//       name: 'useReact',
//       file: conf.file,
//       format: conf.format,
//       globals: {
//         react: 'React'
//       }
//     },
//     plugins: [
//       resolve(), // 解析三方依赖， 如果三方没有 module 类型到处还要配合 commonjs plugin
//       babel(),
//       uglify(), 
//     ],
//     external: [
//       'react'
//     ]
//   }
// })