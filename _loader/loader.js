const fs = require('fs');
const axios = require('axios');
const parse = require('csv-parse');

const ROOT_URL = 'http://electroagua_api.fabioespinosa.com';
// const ROOT_URL = 'http://localhost:8000';

var csvData = [];
var promises = [];

var mapping = {
	0: 'timestamp',
	1: 'longitude',
	2: 'latitude',
	3: 'imei',
	4: 'hg',
	5: 'temp',
	6: 'conduct',
	7: 'od',
	8: 'pH',
	9: 'region'
};

fs
	.createReadStream('./test_data/TestData.csv')
	.pipe(parse({ delimiter: ',' }))
	.on('data', csvRow => {
		var row = {};
		csvRow.forEach((item, index) => {
			row[mapping[index]] = item;
		});
		csvData.push(row);
	})
	.on('end', () => {
		// Subir los celulares:
		// (async function send() {
		// 	for (let i = 1; i < csvData.length; i++) {
		// 		try {
		// 			await axios.post(`${ROOT_URL}/celulares`, csvData[i]);
		// 			console.log('guardado');
		// 		} catch (e) {}
		// 	}
		// })();

		// Subir los datos:
		for (let i = 1; i < csvData.length; i++) {
			// console.log(csvData[i]);
			axios
				.post(`${ROOT_URL}/registros`, csvData[i])
				.then(res => {
					console.log('guardado');
				})
				.catch(err => {
					// console.log(err);
				});
		}
	});
