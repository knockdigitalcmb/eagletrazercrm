module.exports = {
  module: {
      rules: [
          {
              test: /\.(png|jpe?g|gif|webp)$/i,
              type: "asset/resource",
          },
      ],
  },
};
