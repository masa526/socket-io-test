const { SSL_OP_NO_TICKET } = require('constants');

var app = require('http').createServer(handler),
io = require('socket.io').listen(app),
fs = require('fs');

app.listen(8888);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function(err, data) {
        if(err) {
            res.writeHead(500);
            return res.end('error');
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}

io.sockets.on('connection', function(socket) {
    socket.on('emit_from_client', function(data) {
        socket.join(data.room);
        socket.emit('emit_from_server', 'your are in' + data.room);
        socket.broadcast.to(data.room).emit('emit_from_server',data.msg);
    });
});