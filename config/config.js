module.exports={
	port:3306,
	db:{
		database: 'dbalmacen',
		user: 'ArianaZuniga',
		password:'ArianaZuniga',
		options:{
			host:'mydbalmacen.coqbcv5ezi7s.us-east-2.rds.amazonaws.com',
			dialect:'mysql',
			pool:{
				maxConnections:10,
				minConnections:0,
				maxIdleTime:1000
			}
		}
	}
}
