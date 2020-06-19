const path = require('path')

module.exports = {
  stories: ['../packages/**/*.stories.(tsx|mdx)'],
  addons: [
    '@storybook/addon-actions', 
    '@storybook/addon-links',
    '@storybook/addon-docs'
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
          ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: 'css' }, 'antd'],
          ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
          ['import', { libraryName: '@ant-design/icons', libraryDirectory: '', camel2DashComponentName: false }, 'antd-icon'],
        ],
      },
      test: /\.(j|t)sx?$/,
    })

    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx', '.json')
    

    const aliasPairs = [
      ['@code/kit', '../packages/code-kit/src'],
      ['@code/asker', '../packages/code-asker/src'],
      ['@code/use-react', '../packages/code-use-react/src'],
      ['@code/micro', '../packages/code-micro/src'],
    ]

    aliasPairs.forEach(p => {
      config.resolve.alias[p[0]] = path.resolve(__dirname, p[1])
    })

    return config
  },
};
