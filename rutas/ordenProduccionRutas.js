var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var ordenProduccionController=require('../controladores/ordenProduccionController')

api.post('/registro-ordenProd',md_auth.ensureAuth, ordenProduccionController.registroOrden)
api.get('/mostrar-ordenP',md_auth.ensureAuth, ordenProduccionController.mostrarOrden)
api.get('/mostrar-ordenA',md_auth.ensureAuth, ordenProduccionController.mostrarOrdenA)
api.get('/mostrar-ordenE/:id',md_auth.ensureAuth, ordenProduccionController.mostrarOrdenE)
api.put('/aprobar-ordenPA/:id/:id1/:id2',md_auth.ensureAuth, ordenProduccionController.cambiarStatusA)
api.put('/aprobar-ordenP/:id',md_auth.ensureAuth, ordenProduccionController.cambiarStatusB)

module.exports=api