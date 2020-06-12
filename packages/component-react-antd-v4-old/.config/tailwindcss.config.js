const path = require('path')

module.exports = {
  purge: {
    // Specify the paths to all of the template files in your project 
    content: [
      './src/**/*.tsx',
      './src/**/*.ts',
      './src/**/*.jsx',
      './src/**/*.js',
      './src/**/*.vue',
      // etc.
    ].map(c => path.resolve(process.cwd(), c)),

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => {
      console.log('1', '2')
      return content.match(/[\w-/:]+(?<!:)/g) || []
    }
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
