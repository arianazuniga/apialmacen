var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const Compra =sequelize.define('Compras',{
		No_compra :{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Fecha_compra:{
			type:DataTypes.DATEONLY 
		},
		Fecha_entrega:{
			type: DataTypes.DATEONLY
		},
		Subtotal:{
			type: DataTypes.FLOAT,
			
		},
		Iva:{
			type: DataTypes.FLOAT,
			
		},
		Total:{
			type: DataTypes.FLOAT,
			
		},
		Recibido:{
			type:DataTypes.BOOLEAN
		},
		Aprobado:{
			type:DataTypes.BOOLEAN
		}
	})
	return Compra 
}