var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var colorController=require('../controladores/colorController')

api.get('/obtener-color',md_auth.ensureAuth, colorController.obtenerColor)


module.exports=api
