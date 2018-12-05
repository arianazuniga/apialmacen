var models=require('../modelos')
var sequelize = require('sequelize')
const Op = sequelize.Op

function registroInsumo(req,res){
	var params=req.body
	var insumo=models.Insumo.build(params)
	insumo.save()
		.then((insumoRegistrado)=>{
			res.status(200).send(insumoRegistrado)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+ error});
		});
}

function mostrarInsumo(req,res){
	models.Insumo.findAll()
		.then(function(insumos){
			res.status(200).send(insumos)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});

		});
}

function buscarInsumo(req,res){
	var idInsumo= req.params.id

	var conditionalData={
		Id_insumo:{
			[Op.like]:idInsumo+'%'
		}
	}
	models.Insumo.findAll({where: conditionalData})
		.then(function(insumos){
			if(insumos)
			{
				res.status(200).send(insumos) 
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

function buscarInsumoporId(req,res){
	var idInsumo= req.params.id

	models.Insumo.findOne({where:{Id_insumo:idInsumo}})
		.then(function(insumos){
			if(insumos)
			{
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

function actualizarInsumo(req,res){
	
	var condicion=req.params.id
	var insumo=req.body
	models.Insumo.update(insumo, {where:{Id_insumo:condicion}})
	.then(function(){
		models.Insumo.findOne({where:{Id_insumo:condicion}})
			.then(function(insumos){
				if(insumos){
					res.status(200).send(insumos)
				}else{
					res.status(404).send({message:"No existe insumo"})
				}
			})
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		})
}
function validarPosicion(req,res){
	var params=req.params
	var estante= params.estante
	var valorHorizontal=params.valorHorizontal
	var valorVertical=params.valorVertical

	models.Insumo.findOne({where:{$and:[{Estante:estante},{Valor_Horizontal:valorHorizontal},{Valor_Vertical:valorVertical}]}})
		.then(function(insumos){
			if(insumos)
			{
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
function mostrarInsumoR(req,res){
	
	models.Insumo.findAll({where:{Stock:{
		[Op.lte]:sequelize.col('Punto_Reorden')

	}}})
		.then(function(insumos){
			if(insumos)
			{
				res.status(200).send(insumos)
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
	registroInsumo,
	mostrarInsumo,
	buscarInsumo,
	buscarInsumoporId,
	actualizarInsumo,
	validarPosicion,
	mostrarInsumoR
}
