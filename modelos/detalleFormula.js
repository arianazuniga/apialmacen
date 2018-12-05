var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const DetalleFormula =sequelize.define('Detalle_Formulas',{
		Id_detalle:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Cantidad:{
			type: DataTypes.INTEGER,
		}

	})
	return DetalleFormula
}