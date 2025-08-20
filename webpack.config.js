// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './tsc_out/index.js',
  output: {
    filename: 'fig_bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
