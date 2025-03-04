const path = require('path');

module.exports = {
  mode: 'development', // or 'production' for production build
  entry: './frontend/my-auth-client/src/index.js', // Your main React file
  output: {
    path: path.resolve(__dirname, 'frontend/my-auth-client/dist'),
    filename: 'bundle.js', // The name of the bundled file
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // File extensions that Webpack will try to resolve
    alias: {
      '@components': path.resolve(__dirname, 'frontend/my-auth-client/src/components'), // Example alias for components directory
      '@api': path.resolve(__dirname, 'frontend/my-auth-client/src/api'), // Example alias for API directory
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Regular expression to match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel loader to transpile JS and JSX files
        },
      },
      {
        test: /\.css$/, // Regular expression to match .css files
        use: ['style-loader', 'css-loader'], // Load CSS files
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Regular expression to match image files
        use: [
          {
            loader: 'file-loader', // Use file-loader to handle image files
            options: {
              name: '[name].[ext]', // Keep original file name and extension
              outputPath: 'images/', // Directory to output images
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'frontend/my-auth-client/dist'), // Directory to serve files from
    compress: true,
    port: 3000, // Port for the development server
  },
  devtool: 'inline-source-map', // For easier debugging
};