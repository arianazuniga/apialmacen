var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var categoriaController=require('../controladores/categoriaController')

api.get('/obtener-categoria',md_auth.ensureAuth, categoriaController.obtenerCategoria)


module.exports=api
