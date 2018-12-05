var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var usuarioController=require('../controladores/usuarioController')

api.post('/login', usuarioController.loginUsuario)
api.post('/registro-usuario',md_auth.ensureAuth,usuarioController.registroUsuario)
api.get('/verificar-usuario/:id',md_auth.ensureAuth,usuarioController.rfcUsuario)
module.exports=api
