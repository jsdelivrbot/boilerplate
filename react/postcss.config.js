module.exports = {
  plugins: [
    require('precss'),
    require('postcss-will-change'),
    require('autoprefixer'),
    require('postcss-color-rgba-fallback'),
    require('postcss-opacity'),
    require('postcss-pseudoelements'),
    require('postcss-vmin'),
    require('pixrem')
  ]
};
