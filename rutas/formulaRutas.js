var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var formulaController=require('../controladores/formulaController')

api.post('/registro-formulas',md_auth.ensureAuth, formulaController.registroFormula)
api.get('/formulas/:id',md_auth.ensureAuth, formulaController.formula)


module.exports=api
