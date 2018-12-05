'use strict'

var jwt= require('jwt-simple');
var moment= require('moment');
var secret = 'clave_secreta';

exports.createToken = function(usuario){
	var payload={
		sub: usuario.Rfc_usuario,
		rol :usuario.Rol,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};		

	return jwt.encode(payload, secret);
};