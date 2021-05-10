const path = require('path');

//se añade el recurso html-webpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');


const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//llamamos este recurso

const CopyPlugin =require('copy-webpack-plugin');




const Dotenv = require('dotenv-webpack');


const {CleanWebpackPlugin} = require('clean-webpack-plugin');//traemos un elemento para limpiar el build en producion



module.exports = {
   
    entry:'./src/index.js',
    
    output:{

        

    
        path: path.resolve(__dirname,'dist'),
        filename:'[name].[contenthash].js',


        assetModuleFilename:'assets/images/[hash][ext][query]',
   },
   
    mode : 'development',
    watch:true,
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
    new CleanWebpackPlugin(),
  ],

}