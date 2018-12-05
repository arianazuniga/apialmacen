var models=require('../modelos')
var sequelize = require('sequelize')
const Op = sequelize.Op

function registroDetalleCompra(req,res){
	var params=req.body
	var compra=models.DetalleCompra.build(params)
	compra.save()
		.then((compraRegistrada)=>{
			res.status(200).send(compraRegistrada)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}

function detalleCompra(req,res) {
	var no_compra = req.params.id
	models.DetalleCompra.findAll({where:{CompraNoCompra:no_compra},
						include:[
						    {model:models.Insumo},
							{model:models.Compra,
								include:[
									{model:models.Proveedor}]
									
							},
							{model:models.AlmacenInsumo}

						]})

		.then(function(detalleCompra){
			if(detalleCompra){
				res.status(200).send(detalleCompra)
			}else{
				res.status(404).send({message:"No existen compra"})
			}
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}

module.exports={
	registroDetalleCompra,
	detalleCompra
}
