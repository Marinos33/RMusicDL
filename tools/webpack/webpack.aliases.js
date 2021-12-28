const { createWebpackAliases } = require('./webpack.helpers');

// Export aliases
module.exports = createWebpackAliases({
  '@assets': 'assets',
  '@src': 'src',
  '@database': path.resolve(__dirname, './src/main/Database'),
  '@main': path.resolve(__dirname, './src/main'),
  '@renderer': path.resolve(__dirname, './src/renderer'),
  '@components': path.resolve(__dirname, './src/renderer/components'),
  '@redux': path.resolve(__dirname, './src/renderer/redux'),
  '@types': path.resolve(__dirname, './src/renderer/types'),
  '@hooks': path.resolve(__dirname, './src/renderer/hooks'),
  '@context': path.resolve(__dirname, './src/renderer/context'),
});
