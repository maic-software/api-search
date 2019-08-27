module.exports = {
  content: ['src/App.js'],
  css: ['src/css/tailwind.css', 'src/css/App.css'],
  whitelistPatterns: [/ais-.*/],
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[A-z0-9-:\/]+/g) || []
        }
      },
      extensions: ['js']
    }
  ]
}
