var models=require('../modelos')
var Sequelize=require ('sequelize')
var config=require('../config/config')


function registroDetalleCompra(req,res){
	var params=req.body
	var compra=models.Compra.build(params)
	compra.save()
		.then((compraRegistrada)=>{
			res.status(200).send(compraRegistrada)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
function compra(req,res) {
	var no_compra = req.params.id
	models.Compra.findAll({ where:{No_Compra:no_compra},
		include:[
		{model:models.Proveedor},
		{model:models.DetalleCompra,
			include:[
			{model:models.Insumo}]}]
	}
		)

		.then(function(compra){
			if(compra){
				res.status(200).send(compra)
			}else{
				res.status(404).send({message:"No existen compra"})
			}
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}
function mostrarOrden(req,res){
	models.Compra.findAll({where:{Recibido:true}, include:[
            {model:models.Proveedor}
			]})
		.then(function(compra){
			if(compra)
			{
				res.status(200).send(compra)
			}else{
				res.status(404).send({message:"No se ha Aprobado ordenes"})
			}
			
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});

		});
}
function mostrarOrdenNA(req,res){
	models.Compra.findAll({where:{Recibido:false}, include:[
            {model:models.Proveedor}
			]})
		.then(function(compra){
			if(compra)
			{
				res.status(200).send(compra)
			}else{
				res.status(404).send({message:"No se ha generado ordenes"})
			}
			
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});

		});
}
function cambiarStatus(req,res){
	var params= req.params;
	var status=params.status;
	var condicion=params.id;
	console.log()
	models.Compra.update({Recibido:status},{where:{No_Compra:condicion}})
	.then(function(){
		models.Compra.findOne({where:{No_Compra:condicion},include:[
            {model:models.Proveedor}
			]})
		.then(function(compra){
			if(compra){
				res.status(200).send(compra)
			}else{
				res.status(404).send({message:"No existen compra"})
			}
		})
	})
	.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}

function mostrarOrdenAA(req,res){
	models.Compra.findAll({where:{$and:[{Recibido:true},{Aprobado:true}]}, include:[
            {model:models.Proveedor}
			]})
		.then(function(compra){
			if(compra)
			{
				res.status(200).send(compra)
			}else{
				res.status(404).send({message:"No se ha Aprobado ordenes"})
			}
			
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});

		});
}
function mostrarOrdenNAA(req,res){
	models.Compra.findAll({where:{$and:[{Recibido:true},{Aprobado:false}]}, include:[
            {model:models.Proveedor}
			]})
		.then(function(compra){
			if(compra)
			{
				res.status(200).send(compra)
			}else{
				res.status(404).send({message:"No se ha generado ordenes"})
			}
			
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});

		});
}
function cambiarStatusA(req,res){
	var params= req.params;
	var status=params.status;
	var condicion=params.id;
	var sequelize = new Sequelize(
		config.db.database,
		config.db.user,
		config.db.password,
		config.db.options
	)
	console.log()
	models.Compra.update({Aprobado:status},{where:{No_Compra:condicion}})
	.then(function(){
		models.DetalleCompra.findAll({where:{CompraNoCompra:condicion}})
		.then(function(detCompra){
			if(detCompra){
				//iterar+
				for(var det in detCompra){
					//console.log(detCompra[det].dataValues.InsumoIdInsumo+"------"+detCompra[det].dataValues.Cantidad)
					//console.log("=======================================================")
					sequelize.query(' CALL SP_UPDATE_STOCK(:id,:stock)',
						{replacements: { id: detCompra[det].dataValues.InsumoIdInsumo, stock: detCompra[det].dataValues.Cantidad}})
					.then(()=>{
						console.log('OK')
					})
					.catch((error)=>{
						res.status(500).send({error})
					})
				}
				res.status(200).send({message: "Se ha actualizado el stock"})
			}else{
				res.status(404).send({message:"No existen compra"})
			}
		})
	})
	.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}

module.exports={
	registroDetalleCompra,
	compra,
	mostrarOrden,
	mostrarOrdenNA,
	cambiarStatus,
	mostrarOrdenAA,
	mostrarOrdenNAA,
	cambiarStatusA
}