var models=require('../modelos')
var Sequelize=require ('sequelize')
var config=require('../config/config')


function registroOrden(req,res){
	var params=req.body
	var orden=models.OrdenProduccion.build(params)
	orden.save()
		.then((ordenP)=>{
			res.status(200).send(ordenP)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
function mostrarOrden(req,res){
	models.OrdenProduccion.findAll({where:{Aprobado:false}, include:[
            {model:models.Producto}
			]})
		.then(function(ordenP){
			if(ordenP)
			{
				res.status(200).send(ordenP)
			}else{
				res.status(404).send({message:"No se ha Aprobado ordenes"})
			}
			
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});

		});
}
function mostrarOrdenA(req,res){
	models.OrdenProduccion.findAll({where:{Aprobado:true}, include:[
            {model:models.Producto}
			]})
		.then(function(ordenP){
			if(ordenP)
			{
				res.status(200).send(ordenP)
			}else{
				res.status(404).send({message:"No se ha Aprobado ordenes"})
			}
			
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});

		});
}
function mostrarOrdenE(req,res){
	var idProducto= req.params.id

	models.OrdenProduccion.findOne({where:{No_orden:idProducto}})
		.then(function(ordenP){
			if(ordenP)
			{
				res.status(200).send(ordenP)
			}
			else{
				res.status(404).send()
			}
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
function cambiarStatusA(req,res){
	var params= req.params;
	var status=true;
	var cantidax=params.id2
	var condicion=params.id;
	var condicion1=params.id1;
	var sequelize = new Sequelize(
		config.db.database,
		config.db.user,
		config.db.password,
		config.db.options
	)
	console.log(cantidax)
	models.OrdenProduccion.update({Aprobado:status},{where:{No_orden:condicion}})
	.then(function(){
		models.DetalleFormula.findAll({where:{FormulaIdDetalle:condicion1}})
		.then(function(detCompra){
			if(detCompra){
				//iterar+
				for(var det in detCompra){
					//console.log(detCompra[det].dataValues.InsumoIdInsumo+"------"+detCompra[det].dataValues.Cantidad)
					//console.log("=======================================================")
					sequelize.query(' CALL SP_UPDATE_STOCK1(:id,:stock)',
						{replacements: { id: detCompra[det].dataValues.InsumoIdInsumo, stock: detCompra[det].dataValues.Cantidad*cantidax}})
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

function cambiarStatusB(req,res){
	var params= req.params;
	var status=true;
	//var cantidax=params.id2
	var condicion=params.id;
	var condicion1=params.id1;
	var sequelize = new Sequelize(
		config.db.database,
		config.db.user,
		config.db.password,
		config.db.options
	)
	//console.log(cantidax)
	models.OrdenProduccion.update({Aprobado:status},{where:{No_orden:condicion}})
	.then(function(){
		models.OrdenProduccion.findAll({where:{No_orden:condicion}})
		.then(function(detCompra){
			if(detCompra){
				//iterar+
				for(var det in detCompra){
					//console.log(detCompra[det].dataValues.InsumoIdInsumo+"------"+detCompra[det].dataValues.Cantidad)
					//console.log("=======================================================")
					sequelize.query(' CALL SP_UPDATE_STOCK2(:id,:stock)',
						{replacements: { id: detCompra[det].dataValues.ProductoIdProducto, stock: detCompra[det].dataValues.Cantidad}})
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
	registroOrden,
	mostrarOrden,
	mostrarOrdenA,
	mostrarOrdenE,
	cambiarStatusA,
	cambiarStatusB
}