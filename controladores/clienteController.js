var models=require('../modelos')
var sequelize = require('sequelize')
const Op = sequelize.Op

function registroCliente(req,res){
	var params=req.body
	var cliente=models.Cliente.build(params)
	cliente.save()
		.then((clienteRegistrado)=>{
			res.status(200).send(clienteRegistrado)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}

function buscarCliente(req,res){
	var rfc= req.params.rfc

	models.Cliente.findOne({where:{Rfc_cliente:rfc}})
		.then(function(cliente){
			if (cliente) {
			res.status(200).send()
		}
		else{
			res.status(404).send()
		}

		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}

function buscaremail(req,res){
	var email = req.params.email

	models.Cliente.findOne({where:{Email:email}})
		.then(function(email){
			if (email) {
			res.status(200).send()
		}
		else{
			res.status(404).send()
		}

		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
function mostrarCliente(req,res){
	models.Cliente.findAll().then(function(clientes){
		res.status(200).send(clientes)
	})
	.catch(function(error){
		res.status(500).send({message:"Error: "+error});
	});
}
 function buscarClienteE(req,res){
	var rfc= req.params.rfc

	var conditionalData={
		Rfc_cliente:{
			[Op.like]:rfc+'%'
		}
	}
	models.Cliente.findAll({where: conditionalData})
		.then(function(clientes){
			if(clientes)
			{
				res.status(200).send(clientes) 
			}
			else
			{
				res.status(404).send({message:"No existe producto"})
			}
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
function actualizarClientes(req,res){
	
	var condicion=req.params.rfc
	console.log(condicion)
	var cliente=req.body
	models.Cliente.update(cliente, {where:{Rfc_cliente:condicion}})
	.then(function(){
		models.Cliente.findOne({where:{Rfc_cliente:condicion}})
			.then(function(clientes){
				if(clientes){
					res.status(200).send(clientes)
				}else{
					res.status(404).send({message:"No existe cliente"})
				}
			})
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		})
}
module.exports={
	registroCliente,
	buscarCliente,
	buscaremail,
	mostrarCliente,
	buscarClienteE,
	actualizarClientes

}