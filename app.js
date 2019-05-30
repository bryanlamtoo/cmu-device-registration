const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const devicesRouter = require('./routes/devices');
const authRouter = require('./routes/auth');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    info: {
        title: 'Device Registration API',
        version: '1.0.0',
        description: 'Endpoints to test the device registration routes',
    },
    host: 'localhost:4000',
    basePath: '/',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Uncomment and change value to either development, production, testing or staging to test
process.env.NODE_ENV = 'development'


app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api/v1/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/devices', devicesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/************************************************
 *      DATABASE Connection                     *
 ************************************************/

// Initialize the db
require('./db/db')


/************************************************
 *      Setting up the Server                   *
 ************************************************/

var debug = require('debug')('cmu-devices:server');
var http = require('http');

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {

    //Handle Single Page Application
    app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */

// Start the node server
server.listen(port, () => {
    console.log('listening to requests on port ' + port, '\nApp running in ', process.env.NODE_ENV, ' mode')
})

server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


module.exports = app;
