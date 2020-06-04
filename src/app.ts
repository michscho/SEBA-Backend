import express = require('express');
import path = require('path');
import routes from './routes/index';

const config     = require('./config');
const app = express();



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


app.set('port', process.env.PORT || config.port);

const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});


server.on('error', (err) => {
    console.log('Error in the server', err.message);
});