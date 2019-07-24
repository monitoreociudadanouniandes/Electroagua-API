const dotenv = require('dotenv').config();
module.exports = {
	development: {
		username: 'fabioespinosa',
		password: '',
		database: 'electroagua_local',
		host: 'localhost',
		logging: false,
		dialect: 'postgres'
	},
	test: {
		username: 'usuario',
		password: 'cont',
		database: 'electro_test',
		logging: false,
		host: '127.0.0.1',
		dialect: 'postgres'
	},
	production: {
		username: process.env.RDS_USER,
		password: process.env.RDS_PASSWORD,
		logging: false,
		database: 'postgres',
		host: process.env.DATABASE_URL,
		dialect: 'postgres'
	}
};
