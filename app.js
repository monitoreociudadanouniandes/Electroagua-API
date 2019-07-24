const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const models = require('./models');
const routes = require('./routes');

// Serving static files first:
const port_website = 9000;
var app_website = express();
app_website.use(compression());
app_website.use(express.static(path.join(__dirname, './electroagua_react')));
app_website.get('/*', function(req, res) {
    res.sendFile(
        path.join(__dirname, './electroagua_react/index.html'),
        function(err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

// API:
const port = 8000;
var app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(cors());
app.use(bodyParser.json());

routes(app);

process.on('uncaughtException', function(err) {
    console.log(err);
});

if (process.env.NODE_ENV !== 'test') {
    models.sequelize.sync({}).then(() => {
        app.listen(port, () => {
            console.log('Server listening in port ' + port);
        });
    });
} else {
    app.listen(port, () => {
        console.log('Server listening in port  ' + port);
    });
}

app_website.listen(port_website, () => {
    console.log('Website server listening in port ' + port_website);
});

module.exports = app;
