/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 * @format
 */

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve(
      'metro-react-native-babel-transformer',
    ),
  },
};
