var externals = require('rollup-plugin-node-externals').default;
var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var getBabelOutputPlugin = require('@rollup/plugin-babel').getBabelOutputPlugin;

var name = process.env.MODULE;
var input = require.resolve(name);

var path = require('path');
var pkg = null
var pkgPath = input;
while(!pkg) {
  try {
    pkgPath = path.dirname(pkgPath);
    pkg = require(path.join(pkgPath, 'package.json'))
  } catch (err) {
    /* skip */
  }
}

module.exports = {
  input,
  output: {
    file: `lib/${name}-${pkg.version}.js`,
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    externals({
      include: ['readable-stream']
    }),
    resolve.nodeResolve(),
    commonjs(),
    getBabelOutputPlugin({
      presets: [['@babel/preset-env', { modules: 'cjs' }]],
    }),
  ],
};
