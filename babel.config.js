module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@components': './src/components',
          '@fetchApi': './src/utils/modules/FetchApi',
          '@resources': './src/utils/resources',
          '@container': './src/components/Container',
          '@screen': './src/screen/',
          '@src': './src',
        },
      },
    ],
    'jest-hoist',
  ],
};
