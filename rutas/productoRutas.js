var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var productoController=require('../controladores/productoController')

var multipart= require('connect-multiparty');
var md_upload= multipart({uploadDir: './uploads'});


api.post('/registro-producto',md_auth.ensureAuth, productoController.registroProducto)
api.get('/validar-IdProducto/:id',md_auth.ensureAuth, productoController.buscarProductoPorId)
api.put('/subir-imagen/:id', [md_auth.ensureAuth, md_upload], productoController.subirImagen);
api.get('/obtener-imagen/:imageFile', productoController.obtenerImagen);
api.get('/producto', productoController.obtenerProductos);
api.get('/mostrar-productoR',md_auth.ensureAuth, productoController.mostrarProductoR)


module.exports=api
