var models=require('../modelos')
var sequelize = require('sequelize')
const Op = sequelize.Op

function obtenerCategoria(req,res) {
	models.Categoria.findAll()
		.then(function(categoria){
			res.status(200).send(categoria)
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}
module.exports={
	obtenerCategoria
}