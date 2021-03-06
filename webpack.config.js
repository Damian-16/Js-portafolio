const path = require('path');

//se añade el recurso html-webpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');


const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//llamamos este recurso

const CopyPlugin =require('copy-webpack-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');


const Dotenv = require('dotenv-webpack');


const {CleanWebpackPlugin} = require('clean-webpack-plugin');//traemos un elemento para limpiar el build en producion



module.exports = {
 /* Aquí indicamos el elemento inicial de nuestra app.
    O sea, nuestro punto de entrada */    
    entry:'./src/index.js',
    
/* Ahora indicamos cual va a ser el archivo de salida,
    donde va a estar todo el código que compile */
    output:{

         /* Aquí indicamos donde queremos que se guarde el proyecto */

    //aca llamamos path y utilizamos a path de arriba con resolve que nos permite saber en  que directorio esta mi proyecto 
    //asi cuando enviamos esto a un servidor par apreparar nuestro proyecto va  a utilizar el directorio que esta encontrandose este proyecto
        path: path.resolve(__dirname,'dist'),//si ponemos 'dist'es el standar del nombre del proyecto
        /* Y colocamos el nombre del .js que va guardar */
        filename:'[name].[contenthash].js', // cambiamos el anterior llamado filename:'main.js'


        assetModuleFilename:'assets/images/[hash][ext][query]',//esta es la config necesaria para nuestras imgs y nuestras fonts
   },
    /* Vamos a indicar con extensiones vamos a trabajar en
    este proyecto */
    resolve:{

         /* Importante pasar las extensiones con las que vamos a
        trabajar, como .jsx (React.js)  */
        extensions: ['.js'],
        alias:{
          '@utils': path.resolve(__dirname,'src/utils'),//path es para saber donde estamos,luego de dirname es la ubicacion de donde esta utils para llamarlo con alias 
          '@templates': path.resolve(__dirname,'src/templates'),
          '@styles': path.resolve(__dirname,'src/styles'),
          '@images': path.resolve(__dirname,'src/assets/images')
        }
    },

 //un modulo que es un objeto
    module:{
      //que internamente utiliza rules para establecer un array donde tenemos estas configuraciones en este caso babel-loader
        rules:[
      {//este objeto va a ser para trabajar con babel loader 
            //y poder conectar nuestro webpack con babel 
     test:/\.m?js$/,
     //este test nos va  adecir que tipo de extensiones vamos a utilizar
     //cualquier archivo que empiece con m o js encuentralo (mjs es la de modulos)
    exclude:/node_modules/,//esto es para excluir el nodemodules

    use:{
        loader:'babel-loader',// de esta forma ya tenemos la configuracion necesaria para este recurso
        }
     },
     {
       test:/\.css|.styl$/i, //logica para reconocer nuestros archivos css y el preprocesador stylus
       use:[MiniCssExtractPlugin.loader,
      'css-loader',
    'stylus-loader'],//cual es elemento que vamos a  recibir
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
           mimetype:"application/font-woff",//tipo de dato que estamos utilizando
           name:"[name].[contenthash].[ext]",//que respete el nombre que tiene  la extension
           outputPath:"../assets/fonts/",//lleva este recurso hasta este lugar
           publicPath:"../assets/fonts/",//
           esModule:false,
         },

       }
     }
   ]
 },

 plugins:[
    //aca se añade el HtmlWebpackPlugin que fue declarado arriba
    new HtmlWebpackPlugin({
        inject:true,
        template:'./public/index.html',
        filename:'./index.html',
    }),// como argumento se pone inject para que haga la incersion de html
    //luego un template que es donde se encuentra
    //filename x estandar se usa el msimo nombre en este caso html y lo pondra en la carpeta de  distribution

     
    new MiniCssExtractPlugin({
      filename:'assets/[name].[contenthash].css'//para que obtenga los cambios necesarios en cada build  asi como tambien la optimizacion que estamos agregandole a css y js
    }),//utilizacion de nuestro plugin
    new CopyPlugin({
      patterns:[ //aca trae un array de un objeto
        {
          from: path.resolve(__dirname,"src","assets/images"),// desde donde estoy ubicado,dirname, que utilice src y luego internamente la carpeta que estamos utilizando
          to:"assets/images"// a donde lo vamos  a mover
        }
      ]
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],
optimization:{
   minimize:true,
   minimizer:[
     new CssMinimizerPlugin(),//optimizacion para css del proyecto
     new TerserPlugin(),// optimizacion para lo que viene siendo js
   ]
}


}