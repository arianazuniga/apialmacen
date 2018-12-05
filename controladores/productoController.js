var models=require('../modelos')
var sequelize=require ('sequelize')
var config=require('../config/config')

var fs = require('fs');
var path= require('path');
const Op = sequelize.Op

function registroProducto(req,res){
	var params=req.body
	var producto=models.Producto.build(params)
	producto.save()
		.then((productoRegistrado)=>{
			res.status(200).send(productoRegistrado)

		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+ error});

		});
}
function buscarProductoPorId(req,res){
	var idInsumo= req.params.id

	models.Producto.findOne({where:{Id_producto:idInsumo}})
		.then(function(productos){
			if(productos)
			{
				res.status(200).send(productos)
			}
			else{
				res.status(404).send()
			}
		})
		.catch(function(error) {
			console.log(":v")
			res.status(500).send({message:"Error: "+error});
		});
}
function subirImagen(req, res) {
	var condicion = req.params.id;
	var file_name = 'No subido...';
	console.log("ID"+ condicion)
	if (req.files){
		var file_path = req.files.Imagen.path;
		console.log(file_path)
		var file_split = file_path.split('\\' );
		console.log("/ "+file_split)
		var file_name = file_split[1];
		console.log("name: "+file_name)
		var ext_split = file_name.split('.');//ERR
		var file_ext = ext_split[1];
		console.log("exte "+file_ext)
		if (file_ext=='png'||file_ext=='jpg'|| file_ext=='gif'){

			models.Producto.update( {Imagen: file_name}, {where: {Id_producto:condicion}})
				.then(function(){
					models.Producto.findOne({where:{Id_producto:condicion}})
						.then(function(productos){
							if(productos){
								res.status(200).send(productos)
							}else{
								res.status(404).send({message:"No existe el producto"})
							}
						})
				})
				.catch(function(error){
					res.status(500).send({message:"Error: "+ error})
				})
		}
	}else{
		res.status(500).send({message:"Eror"})
		console.log('Error al cargar')
	}
}

function obtenerImagen(req,res){
	var imageFile= req.params.imageFile;
	var path_file= './uploads/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			console.log(">>>>>>>"+path_file)
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
function obtenerProductos(req,res){

  models.Producto.findAll()
    .then(function(productos){
      if(productos)
      {
        res.status(200).send(productos)
      }
      else{
        res.status(404).send()
      }
    })
    .catch(function(error) {
      res.status(500).send({message:"Error: "+error});
    });
}
function mostrarProductoR(req,res){
	
	models.AlmacenProducto.findAll({where:{Stock:{
		[Op.lte]:sequelize.col('Punto_Reorden')
	}},include:[{model:models.Producto}]})
		.then(function(producto){
			if(producto)
			{
				res.status(200).send(producto)
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
	registroProducto,
	buscarProductoPorId,
	subirImagen,
	obtenerImagen,
	obtenerProductos,
	mostrarProductoR
}
