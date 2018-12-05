var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var clienteController=require('../controladores/clienteController')

api.post('/registro-cliente',md_auth.ensureAuth, clienteController.registroCliente)
api.get('/validar-rfcC/:rfc',md_auth.ensureAuth, clienteController.buscarCliente)
api.get('/validar-emailC/:email',md_auth.ensureAuth, clienteController.buscaremail)
api.get('/mostrar-clientes',md_auth.ensureAuth,clienteController.mostrarCliente)
api.get('/mostrar-clientes/:rfc',md_auth.ensureAuth,clienteController.buscarClienteE)
api.put('/actualizar-cliente/:rfc',md_auth.ensureAuth,clienteController.actualizarClientes)

module.exports=api
