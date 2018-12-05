var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const DetalleCompra =sequelize.define('Detalle_Compras',{
		Id_detalle :{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		
		Cantidad:{
			type:DataTypes.INTEGER 
		},
		Precio:{
			type:DataTypes.FLOAT,
			
		},
		Subtotal:{
			type: DataTypes.FLOAT,
			
		},
		Cantidad_restante:{
			type:DataTypes.INTEGER 
		}
		
	})
	return DetalleCompra 
}