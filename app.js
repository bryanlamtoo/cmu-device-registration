var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var sassMiddleware = require('node-sass-middleware');
var mongoose = require('mongoose');
const cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var devicesRouter = require('./routes/devices');

var app = express();


app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(sassMiddleware({
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     indentedSyntax: true, // true = .sass and false = .scss
//     sourceMap: true
// }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/devices', devicesRouter);

/************************************************
 *      DATABASE Connection                     *
 ************************************************/
mongoose.connect("mongodb+srv://esn_admin:esn_admin@esn-nn2md.mongodb.net/device_reg?retryWrites=true",
{
    useNewUrlParser: true,
    useCreateIndex: true
  }, (err) => {
    if (!err) {
      console.log('Database connected successfully')
    } else {
      console.log('Error in database connection: ' + err)
    }
  })
//mongoose.connect("mongodb://localhost:27017/devices_reg");
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function () {
    console.log('Database Connected');
})


/************************************************
 *      Setting up the Server                   *
 ************************************************/

var debug = require('debug')('cmu-devices:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

var server = http.createServer(app);


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
