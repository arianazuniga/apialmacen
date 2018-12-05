var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var tallaController=require('../controladores/tallaController')

api.get('/obtener-talla',md_auth.ensureAuth, tallaController.obtenerTalla)


module.exports=api