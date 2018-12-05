var models=require('../modelos')
var sequelize = require('sequelize')
const Op = sequelize.Op

function obtenerColor(req,res) {
	models.Color.findAll()
		.then(function(colors){
			res.status(200).send(colors)
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}
module.exports={
	obtenerColor
}
