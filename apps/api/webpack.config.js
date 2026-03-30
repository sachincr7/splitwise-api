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
  };
};
