const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin');


const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const CopyPlugin =require('copy-webpack-plugin');




const Dotenv = require('dotenv-webpack');



const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');//si esto tira error se le agrega .bundleAnalyzerPlugin; al final de ese parentesis



module.exports = {
   
    entry:'./src/index.js',
    
    output:{

        

    
        path: path.resolve(__dirname,'dist'),
        filename:'[name].[contenthash].js',


        assetModuleFilename:'assets/images/[hash][ext][query]',
   },
   
    mode : 'development',
    // watch:true,
    devtool:'source-map',//nos permite generar un mapa en formato json de nuestro codigo
    resolve:{

      
        extensions: ['.js'],
        alias:{
          '@utils': path.resolve(__dirname,'src/utils'),
          '@templates': path.resolve(__dirname,'src/templates'),
          '@styles': path.resolve(__dirname,'src/styles'),
          '@images': path.resolve(__dirname,'src/assets/images')
        }
    },

 
    module:{
    
        rules:[
      {
     test:/\.m?js$/,
     
    exclude:/node_modules/,

    use:{
        loader:'babel-loader',
        }
     },
     {
       test:/\.css|.styl$/i, 
       use:[MiniCssExtractPlugin.loader,
      'css-loader',
    'stylus-loader'],
     },
     {
       test:/\.png/,
       type:'asset/resource'
     },
     {
       test:/\.(woff|woff2)$/,
       use:{
         loader:'url-loader',
         options:{
           limit:1000,
           mimetype:"application/font-woff",
           name:"[name].[contenthash].[ext]",
           outputPath:"../assets/fonts/",
           publicPath:"../assets/fonts/",
           esModule:false,
         },

       }
     }
   ]
 },

 plugins:[
  
    new HtmlWebpackPlugin({
        inject:true,
        template:'./public/index.html',
        filename:'./index.html',
    }),
     
    new MiniCssExtractPlugin({
      filename:'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns:[ 
        {
          from: path.resolve(__dirname,"src","assets/images"),
          to:"assets/images"
        }
      ]
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin(),
 
  ],
  devServer: {
    contentBase:path.join(__dirname,'dist'),
    compress:true,
    historyApiFallback:true,//esto es para poder navegar entre pantallas en la url
    port:3005,
  }

}