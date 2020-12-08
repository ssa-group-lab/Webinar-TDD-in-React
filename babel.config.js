module.exports = (api) => {
  // https://github.com/facebook/jest/issues/3126#issuecomment-573262066
  const isTest = api.env("test");

  const presets = [];

  if (isTest) {
    presets.push([
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],  "@babel/preset-react");
  } else {
    presets.push("@babel/preset-env", "@babel/preset-react");
  }

  presets.push();

  // plugins: [
  //   "@babel/plugin-transform-regenerator",
  //   "@babel/plugin-transform-runtime",
  // ],

  return { presets };
};
