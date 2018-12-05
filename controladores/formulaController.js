var models=require('../modelos')
var Sequelize=require ('sequelize')
var config=require('../config/config')


function registroFormula(req,res){
	var params=req.body
	var formula=models.Formula.build(params)
	formula.save()
		.then((formulaR)=>{
			res.status(200).send(formulaR)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
function formula(req,res) {
	var id_producto = req.params.id
	models.Formula.findOne({ where:{ProductoIdProducto:id_producto},
		include:[
		{model:models.Producto},
		{model:models.DetalleFormula,
			include:[
			{model:models.Insumo}]}]
	}
		)

		.then(function(formula){
			if(formula){
				res.status(200).send(formula)
			}else{
				res.status(404).send({message:"No existen formula"})
			}
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}
module.exports={
	registroFormula,
	formula 
}