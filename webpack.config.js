module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx|html)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };