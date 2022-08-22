const path = require("path");
const {override, getBabelLoader, addWebpackAlias, addWebpackModuleRule} = require("customize-cra");

module.exports = override(
  removeBuiltinBabelConfig,
  enableBabelConfig,
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addWebpackModuleRule({
    test: /\.(png|svg|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },)
);

function removeBuiltinBabelConfig(config) {
  const loader = getBabelLoader(config);

  loader.options.presets = [];
  loader.options.plugins = [];

  return config;
}

function enableBabelConfig(config) {
  const loader = getBabelLoader(config);
  loader.options.configFile = path.resolve(__dirname, "babel.config.js");
  return config;
}

