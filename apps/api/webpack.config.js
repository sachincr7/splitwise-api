const path = require('path');

module.exports = (options) => {
  const externals = Array.isArray(options.externals)
    ? options.externals
    : options.externals
      ? [options.externals]
      : [];

  return {
    ...options,
    externals: [
      ...externals,
      { bcrypt: 'commonjs bcrypt' },
    ],
    resolve: {
      ...options.resolve,
      alias: {
        ...(options.resolve?.alias ?? {}),
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
};
