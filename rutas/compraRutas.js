var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var compraController=require('../controladores/compraController')

api.post('/registro-compras',md_auth.ensureAuth, compraController.registroDetalleCompra)
api.get('/compras/:id',md_auth.ensureAuth, compraController.compra)
api.get('/mostrar-orden',md_auth.ensureAuth, compraController.mostrarOrden)
api.get('/mostrar-ordenNA',md_auth.ensureAuth, compraController.mostrarOrdenNA)
api.put('/aprobar-orden/:id/:status',md_auth.ensureAuth, compraController.cambiarStatus)
api.get('/mostrar-ordenAA',md_auth.ensureAuth, compraController.mostrarOrdenAA)
api.get('/mostrar-ordenNAA',md_auth.ensureAuth, compraController.mostrarOrdenNAA)
api.put('/aprobar-ordenA/:id/:status',md_auth.ensureAuth, compraController.cambiarStatusA)
module.exports=api
