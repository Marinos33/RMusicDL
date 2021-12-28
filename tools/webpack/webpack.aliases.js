const { createWebpackAliases } = require('./webpack.helpers');

// Export aliases
module.exports = createWebpackAliases({
  '@assets': 'assets',
  '@src': 'src',
  '@database': 'src/main/Database',
  '@main': 'src/main',
  '@renderer': 'src/renderer',
  '@components': 'src/renderer/components',
  '@redux': 'src/renderer/redux',
  '@types': 'src/renderer/types',
  '@hooks': 'src/renderer/hooks',
  '@context': 'src/renderer/context',
});
