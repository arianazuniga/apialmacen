var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var detalleCompraController=require('../controladores/detalleCompraController')

api.post('/registro-compra',md_auth.ensureAuth, detalleCompraController.registroDetalleCompra)
api.get('/detalle-compra/:id',md_auth.ensureAuth, detalleCompraController.detalleCompra)


module.exports=api
