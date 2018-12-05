var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const Formula =sequelize.define('Formulas',{
		Id_detalle:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

	})
	return Formula
}