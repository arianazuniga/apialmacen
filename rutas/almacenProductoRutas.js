var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var almacenProductoController=require('../controladores/almacenProductoController')

api.post('/registro-almacenp',md_auth.ensureAuth, almacenProductoController.registroAlmacenProducto)
api.get('/validar-posicionp/:estante/:valorHorizontal/:valorVertical',md_auth.ensureAuth, almacenProductoController.validarPosicion)
api.get('/obtener-almacen/:idProd', md_auth.ensureAuth, almacenProductoController.buscarAlmacen)

module.exports=api