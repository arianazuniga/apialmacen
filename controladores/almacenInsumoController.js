var models=require('../modelos')
var sequelize = require('sequelize')
const Op = sequelize.Op

function registroAlmacenInsumo(req,res){
	var params=req.body
	var almacen=models.AlmacenInsumo.build(params)
	almacen.save()
		.then((insumoRegistrado)=>{
			res.status(200).send(insumoRegistrado)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}

module.exports={
	registroAlmacenInsumo	
}
