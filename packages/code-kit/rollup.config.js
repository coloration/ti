import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const configMap = {
  umd: {
    file: 'dist/index.js',
    format: 'umd'
  },
}

export default ['umd'].map(k => {
  const conf = configMap[k]

  return {
    input: 'esm/index.js',
    output: {
      name: 'kit',
      file: conf.file,
      format: conf.format
    },
    plugins: [
      resolve(), // 解析三方依赖， 如果三方没有 module 类型到处还要配合 commonjs plugin
      babel(),
      uglify(), 
    ]
  }
})