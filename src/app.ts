import express = require('express');
import path = require('path');
import routes from './routes/index';

const middleware = require('./middleware');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const config     = require('./config');
//const auth  = require('./routes/auth');
//const movie = require('./routes/movie');
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.allowCrossDomain);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//api.use('/auth'  , auth);
//api.use('/movies', movie);

app.set('port', process.env.PORT || config.port);

const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});


server.on('error', (err) => {
    console.log('Error in the server', err.message);
});