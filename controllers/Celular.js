const db = require('../models');
const Celular = require('../models').Celular;

exports.list = (req, res) => {};

exports.add = async (req, res) => {
	try {
		let ya_existe = await Celular.findOne({
			where: {
				imei: req.body.imei
			}
		});
		if (!ya_existe) {
			const celular = Celular.build(req.body);
			const resultado = await celular.save();
			res.json(resultado);
		} else {
			res.status(500);
			res.send();
		}
	} catch (e) {
		res.status(500);
		res.send();
	}
};

exports.get = async (req, res) => {
	try {
		let encontrado = await Celular.findOne({
			where: {
				imei: req.params.imei
			}
		});
		console.log(encontrado);
		res.json(encontrado);
	} catch (err) {
		console.log(err);
	}
};
