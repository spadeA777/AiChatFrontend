module.exports = {
    overrides: [{
      test: /\.d\.ts$/,
      parserOpts: {
        plugins: [["typescript", { "dts": true }]]
      }
    }]
}