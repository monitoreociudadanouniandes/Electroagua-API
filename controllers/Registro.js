const moment = require('moment');
const db = require('../models');
const Registro = require('../models').Registro;
const Celular = require('../models').Celular;
const Op = Sequelize.Op;

exports.getRegistros = async (req, res) => {

    try {
        const registros = await Registro.findAll();
        res.json(registros);
    } catch (err) {
        res.status(500);
        res.send();
    }
};

exports.getRegistrosGeo = async (req, res) => {
    try {
        const registros = await Registro.findAll({
            where: req.params.id_region && {
                region: req.params.id_region
            }
        });
        const geoJson = { type: 'FeatureCollection', features: [] };
        registros.forEach((registro, index) => {
            const feature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [+registro.longitude, +registro.latitude]
                },
                properties: { ...registro.dataValues }
            };
            geoJson.features.push(feature);
        });

        res.json(geoJson);
        // var respuesta = JSON.stringify(geoJson);
        // respuesta = 'eqfeed_callback(' + respuesta + ');';
        // res.send(respuesta);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send();
    }
};

exports.add = async (req, res) => {
    console.log(JSON.stringify(req.body));
    try {

        let celular = await Celular.findOne({
            where: {
                imei: req.body.imei
            }
        });

        if (celular) {
            const id_celular = celular.id;
            req.body.id_celular = id_celular;
            if (validate(req.body)) {
                const registro = Registro.build(req.body);
                let resultado = await registro.save();
                let cantidad = await Registro.count({
                    where: {
                        id_celular
                    }
                });
                resultado.dataValues.num_registros = cantidad;
                res.json(resultado);
            } else {
                console.log('error');
                res.status(500);
                res.json({
                    err:
                        'El timestamp no esta en el formato DD/MM/YYYY HH:MM:SS o alguno de los atributos no es un numero'
                });
            }
        } else {
            // Agrega el celular si no existe ya:
            req.body.id = null;
            const celular = Celular.build(req.body);
            const resultado = await celular.save();
            exports.add(req, res);
        }
    } catch (err) {
        console.log(err.message);
        if (err.name === 'SequelizeUniqueConstraintError') {
            err.message =
                'Ya existe un registro con exactamente este imei y este timestamp';
        }
        res.status(500);
        res.json({ err: err.message });
    }
};

function validate(attributes) {
    const { timestamp, hg, temp, pH, od } = attributes;
    console.log(attributes);
    console.log(moment(timestamp, 'DD/MM/YYYY HH:mm:ss', true).isValid());
    return (
        moment(timestamp, 'DD/MM/YYYY HH:mm:ss', true).isValid() &&
        Number(hg) == hg &&
        Number(temp) == temp &&
        Number(pH) == pH &&
        Number(od) == od
    );
}
exports.delete = async (req, res) => {
    try{
       
        let registroE = await Registro.findOne({
            where: {
                id: req.params.id_reg
            }
        });
        registroE.destroy()
        console.log('no fallaaa:!!!');
        return res.status(200).send("Registro Eliminado exitosamente!");

    }catch(e){
        console.log('falló:!!!'+ e);
        return res.status(404).send('Err: ' + e);
    }


}
exports.deleteFaulty =  async (req, res) => {
        try{
            const registros = await Registro.findAll({
                where:{
                    latitude: "0",
                    longitude: "0"
                }
            });
            registros.forEach(reg=>reg.destroy());
            res.status(200).send("Registros falsos (Lat: 0 Lon: 0) Eliminados Exitosamente!")
        }catch(e){
            res.status(500).send("Ups, ha Ocurrido un error eliminando los registros. Error: "+ e);
        }
}