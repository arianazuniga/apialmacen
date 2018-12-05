var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var insumoController=require('../controladores/insumoController')

api.post('/registro-insumo',md_auth.ensureAuth, insumoController.registroInsumo)
api.get('/mostrar-insumo',md_auth.ensureAuth, insumoController.mostrarInsumo)
api.get('/mostrar-insumo/:id',md_auth.ensureAuth, insumoController.buscarInsumo)
api.get('/validar-IdInsumo/:id',md_auth.ensureAuth, insumoController.buscarInsumoporId)
api.put('/actualizar-insumo/:id',md_auth.ensureAuth, insumoController.actualizarInsumo)
api.get('/validar-posicion/:estante/:valorHorizontal/:valorVertical',md_auth.ensureAuth, insumoController.validarPosicion)
api.get('/mostrar-insumoR',md_auth.ensureAuth, insumoController.mostrarInsumoR)
module.exports=api

