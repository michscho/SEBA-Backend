import express = require('express');
import path = require('path');
import index from './routes/index';

const middleware = require('./middleware');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const config     = require('./config');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authentication  = require('./routes/authentication');
const course = require('./routes/course');
const app = express();



var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
};

// options for swagger jsdoc
var options = {
    swaggerDefinition: swaggerDefinition, // swagger definition
    apis: ['app.ts', 'routes/*.js'], // path where API specification are written
};

// initialize swaggerJSDoc
var swaggerSpec = swaggerJsDoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.allowCrossDomain);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/authentication'  , authentication);
app.use('/course', course);

app.set('port', process.env.PORT || config.port);

const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + config.port);
});


server.on('error', (err) => {
    console.log('Error in the server', err.message);
});