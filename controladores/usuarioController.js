var models=require('../modelos')
var bcrypt = require('bcrypt-nodejs')
var sequelize = require('sequelize')
var jwt = require('../services/jwt')

function registroUsuario(req,res){
	var params = req.body;

	console.log(params)
	
	var usuario = models.Usuario.build(params)

	if(params.Contrasenia){
		bcrypt.hash(params.Contrasenia,null,null, function(err,hash){
			usuario.Contrasenia=hash;
			console.log(usuario.Contrasenia)
			if(usuario.Rfc_usuario!= null && usuario.Rol!=null){
				usuario.save()
					.then(function(product){
						res.status(200).send(usuario)
					})
			    	.catch(sequelize.ValidationError, function(error) {
						 console.log("Errores de validación:", error);
						 for (var i in error.errors) {
						 console.log('Error en el campo:', error.errors[i].value);
						 };
						 res.status(500).send({error});
					})
					.catch(function(error) {
						res.status(500).send({message:"Error: "+error});
					});
			}else {
				
				res.status(500).send({message:'Llena todos los campos'});
			}
		});
	}else{
		res.status(500).send({message:'Introduce la contraseña'});
	}
}

function loginUsuario(req,res){
	var params = req.body;
	var rfc_usuario= params.Rfc_usuario;
	var contrasenia = params.Contrasenia;

	models.Usuario.findOne({where:{Rfc_usuario:rfc_usuario.toLowerCase()}})
		.then(function(usuario){
			if(usuario){
					bcrypt.compare(contrasenia, usuario.dataValues.Contrasenia, (err, check )=>{
					if (check){
						//devolvemos el usuario
						if(params.gethash){
							// devolver un token 
							res.status(200).send({
								token: jwt.createToken(usuario)
							});
						}else{
							res.status(200).send({usuario});
						}
					}else {
						res.status(404).send({message:"El usuario no se ha podido loguear"});
						console.log(":v")
					}
				});
			}else{
				res.status(404).send({message:"No existe el usuario"})

			}
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});

}
function rfcUsuario(req,res){
var condicion = req.params.id;
	models.Usuario.findOne({where:{Rfc_usuario:condicion}})
		.then(function(usuario){
			if(usuario){
				res.status(200).send(usuario)
			}else{
				res.status(404).send({message:"No existe el usuario"})
			}
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}
module.exports={

	registroUsuario,
	loginUsuario,
	rfcUsuario
}
