var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const Proveedor =sequelize.define('Proveedores',{
		Rfc_proveedor:{
			type:DataTypes.STRING(15),
			primaryKey: true
		},
		Razon_social:{
			type:DataTypes.STRING(50)
		},
		Calle:{
			type:DataTypes.STRING(30)
		},
		Colonia:{
			type:DataTypes.STRING(30)
		},
		Ciudad:{
			type:DataTypes.STRING(30)
		},
		Numero:{
			type:DataTypes.INTEGER
		},
		Cp:{
			type:DataTypes.STRING(5)
		},
		Telefono:{
			type:DataTypes.STRING(12)
		},
		Email:{
			type:DataTypes.STRING(30),
			validate:{
				isEmail:true
			}
		}
	})
	return Proveedor
}