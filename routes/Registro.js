const Registro = require('../controllers/Registro');

module.exports = function(app) {
	app.get('/registros', Registro.getRegistros);
	app.get('/registros_geo', Registro.getRegistrosGeo);
	app.get('/registros_geo/:id_region', Registro.getRegistrosGeo);
	app.post('/registros', Registro.add);
	app.delete('/registros/:id_reg', Registro.delete);
	app.delete('/registros', Registro.deleteFaulty);
};
