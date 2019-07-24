var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
	auth: {
		api_key: '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'
	}
};
var client = nodemailer.createTransport(sgTransport(options));

const usuario = 'monitoreo.c@uniandes.edu.co ';

exports.enviar = (req, res) => {
	var email = {
		from: req.body.sender,
		fromname: req.body.nombre + ' ' + req.body.apellido,
		to: usuario,
		subject: 'Correo de Monitoreo de Agua',
		text: req.body.mensaje
	};

	client.sendMail(email, function(err, info) {
		if (err) {
			console.log(err);
		} else {
			res.status(200);
			res.send();
			console.log('Message sent to: ' + usuario);
		}
	});
};
