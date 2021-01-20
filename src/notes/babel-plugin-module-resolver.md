Rút ngắn link import các folder:

Trong package.json thêm :
"babel-plugin-module-resolver": "^4.1.0",

# babel.config.js

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
