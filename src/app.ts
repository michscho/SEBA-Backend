import express = require('express');
import path = require('path');

const middleware = require('./middleware');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const config     = require('./config');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authentication  = require('./routes/authentication');
const course = require('./routes/course');
const app = express();




const options = {
    swaggerDefinition: {
        info: {
            title: 'Learn More Backend Service',
            version: '0.1'
        }
    },
    apis: ['src/*.ts', 'src/routes/*.ts'],
};
const swaggerSpec = swaggerJsDoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.allowCrossDomain);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/authentication'  , authentication);
app.use('/course', course);

app.set('port', process.env.PORT || config.port);


/**
 * @swagger
 * /demo:
 *   get:
 *     description: Log In
 */
app.get("/demo", (req, res) => {
    res.status(200).send("Customer results");
})



const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + config.port);
});


server.on('error', (err) => {
    console.log('Error in the server', err.message);
});