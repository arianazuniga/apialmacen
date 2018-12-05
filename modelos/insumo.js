var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const Insumo =sequelize.define('Insumos',{
		Id_insumo :{
			type: DataTypes.STRING(5),
			primaryKey: true
		},
		Nombre:{
			type:DataTypes.STRING(20)
		},
		Color:{
			type:DataTypes.STRING(15)
		},
		Unidad_medida:{
			type: DataTypes.STRING(15)
		},
		Estante:{
			type:DataTypes.STRING(2)
		},
		Valor_Horizontal:{
			type: DataTypes.INTEGER,
			validate:{
				isNumeric: true
			}
		},
		Valor_Vertical:{
			type: DataTypes.INTEGER,
			validate:{
				isNumeric: true
			}
		},
		Stock:{
			type: DataTypes.INTEGER,
			defaultValue:0,
			validate:{
				isNumeric: true
			}
		},
		Punto_Reorden:{
			type: DataTypes.INTEGER,
			validate:{
				isNumeric: true
			} 
		}
	})
	return Insumo 
}