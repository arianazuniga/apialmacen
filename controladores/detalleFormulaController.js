var models=require('../modelos')
var Sequelize=require ('sequelize')
var config=require('../config/config')


function registroDetalleFormula(req,res){
	var params=req.body
	var detalleFormula=models.DetalleFormula.build(params)
	detalleFormula.save()
		.then((detalleFormula)=>{
			res.status(200).send(detalleFormula)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
module.exports={
	registroDetalleFormula
}