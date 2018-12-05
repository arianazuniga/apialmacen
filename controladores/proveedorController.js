var models=require('../modelos')

function registroProveedor(req,res){
	var params=req.body
	var proveedor=models.Proveedor.build(params)
	proveedor.save()
		.then((proveedorRegistrado)=>{
			res.status(200).send(proveedorRegistrado)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}

function buscarproveedor(req,res){
	var rfc= req.params.rfc

	models.Proveedor.findOne({where:{Rfc_proveedor:rfc}})
		.then(function(proveedor){
			if (proveedor) {
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

	models.Proveedor.findOne({where:{Email:email}})
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
function mostrarProveedor(req,res){
	models.Proveedor.findAll()
		.then(function(proveedor){
			if (proveedor) {
			res.status(200).send(proveedor)
		}
		else{
			res.status(404).send()
		}

		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
function buscarProveedorId(req,res){
	var rfc= req.params.rfc

	models.Proveedor.findOne({where:{Rfc_proveedor:rfc}})
		.then(function(proveedor){
			if (proveedor) {
			res.status(200).send(proveedor)
		}
		else{
			res.status(404).send()
		}

		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
module.exports={
	registroProveedor,
	buscarproveedor,
	buscaremail,
	mostrarProveedor,
	buscarProveedorId
}