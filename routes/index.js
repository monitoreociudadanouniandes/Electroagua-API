const Celular = require('./Celular');
const Registro = require('./Registro');
const Mail = require('./Mail');

module.exports = function(app) {
	Celular(app);
	Registro(app);
	Mail(app);
};
