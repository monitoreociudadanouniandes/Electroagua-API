const Mail = require('../controllers/Mail');

module.exports = function(app) {
	app.post('/contacto', Mail.enviar);
};
