const Celular = require('../controllers/Celular');

module.exports = function(app) {
	app.get('/celulares/:imei', Celular.get);
	app.get('/celulares', Celular.list);
	app.post('/celulares', Celular.add);
};
