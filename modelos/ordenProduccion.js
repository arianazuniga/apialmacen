var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const OrdenProduccion =sequelize.define('Orden_Prod',{
		No_orden:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Fecha_inicio:{
			type:DataTypes.DATEONLY 
		},
		Fecha_entrega:{
			type: DataTypes.DATEONLY
		},
		Cantidad:{
			type: DataTypes.INTEGER,
			
		},
		Aprobado:{
			type:DataTypes.BOOLEAN
		}
	})
	return OrdenProduccion
}