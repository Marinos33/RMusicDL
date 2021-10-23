const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

module.exports = {
  target: 'electron-renderer',
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    /*fallback: {
      "child_process": false,
      "path": false,
      "fs": false,
      "os": false,
      "stream": false,
      "assert": false,
      "util": false
      // and also other packages that are not found
    },*/
    alias: {
      // React Hot Loader Patch
      'react-dom': '@hot-loader/react-dom',
      // Custom Aliases
      ...require('./webpack.aliases'),
    },
  },
  stats: 'minimal',
};
