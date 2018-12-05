var models=require('../modelos')
var sequelize = require('sequelize')
const Op = sequelize.Op

function obtenerTalla(req,res) {
	models.Talla.findAll()
		.then(function(talla){
			res.status(200).send(talla)
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}
module.exports={
	obtenerTalla
}