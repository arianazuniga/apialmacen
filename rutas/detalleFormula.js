var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var detalleFormulaController=require('../controladores/detalleFormulaController')

api.post('/registro-formula',md_auth.ensureAuth, detalleFormulaController.registroDetalleFormula)

module.exports=api
