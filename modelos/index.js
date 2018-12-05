var path=require('path')
var fs=require('fs')
var Sequelize=require ('sequelize')
var config=require('../config/config')

var sequelize= new Sequelize(
	config.db.database,
	config.db.user,
	config.db.password,
	config.db.options
)

var insumo = sequelize.import(path.join(__dirname,'insumo'))
var proveedor= sequelize.import(path.join(__dirname,'proveedor'))
var usuario =sequelize.import(path.join(__dirname,'usuario'))
var compra=sequelize.import(path.join(__dirname,'compra'))
var detalleCompra=sequelize.import(path.join(__dirname,'detalleCompra'))
var producto=sequelize.import(path.join(__dirname,'producto'))
//var categoria=sequelize.import(path.join(__dirname,'categoria'))
//var color=sequelize.import(path.join(__dirname,'color'))
//var talla=sequelize.import(path.join(__dirname,'talla'))
var almacenProducto=sequelize.import(path.join(__dirname,'almacenProducto'))
var cliente=sequelize.import(path.join(__dirname,'cliente'))
var formula=sequelize.import(path.join(__dirname,'formula'))
var detalleFormula=sequelize.import(path.join(__dirname,'detalleFormula'))
var ordenProduccion=sequelize.import(path.join(__dirname,'ordenProduccion'))


//relaciones
detalleCompra.belongsTo(compra);
compra.hasMany(detalleCompra);


compra.belongsTo(proveedor);
proveedor.hasMany(compra);

detalleCompra.belongsTo(insumo);
insumo.hasMany(detalleCompra);

//producto.belongsTo(categoria);
//categoria.hasMany(producto);

almacenProducto.belongsTo(producto);
producto.hasMany(almacenProducto);

//almacenProducto.belongsTo(color);
//color.hasMany(almacenProducto);

//almacenProducto.belongsTo(talla);
//talla.hasMany(almacenProducto);

//venta.belongsTo(cliente);
//cliente.hasMany(venta);

formula.belongsTo(producto);
producto.hasOne(formula);

detalleFormula.belongsTo(formula);
formula.hasMany(detalleFormula);

detalleFormula.belongsTo(insumo);
insumo.hasMany(detalleFormula)

ordenProduccion.belongsTo(producto);
//producto.hasOne(ordenProduccion);

sequelize.sync({force:true}); 
//sequelize.sync();  

exports.Insumo= insumo 
exports.Proveedor= proveedor 
exports.Usuario=usuario
exports.Compra=compra
exports.DetalleCompra=detalleCompra
exports.Producto=producto
//exports.Categoria=categoria
//exports.Color=color
//exports.Talla=talla
exports.AlmacenProducto=almacenProducto
exports.Cliente=cliente
exports.Formula=formula
exports.DetalleFormula=detalleFormula
exports.OrdenProduccion=ordenProduccion