var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const Usuario =sequelize.define('Usuarios',{
		Rfc_usuario:{
			type:DataTypes.STRING(50),
			primaryKey: true
		},
		Contrasenia:{
			type:DataTypes.STRING(100)
		},
		Rol:{
			type:DataTypes.STRING(50)
		}
	})
	return Usuario
}