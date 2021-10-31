module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-react",
    "@babel/preset-env",
    {
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime",
      ],
    },
  ];

  return {
    presets,
  };
};
