const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(PORT, () => {
  console.log(`Server listening. Port: ${PORT}`);
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.send(`${__dirname}/index.html`);
});

const io = require('socket.io')(http);

const crypto = require('crypto');

io.on('connection', socket => {
  console.log('user connected');

  (() => {
    const token = makeToken(socket.id);
    io.to(socket.id).emit('token', { token: token });
  })();

  socket.on('post', post => {
    io.emit('msg', post);
  });
});

const makeToken = id => {
  return crypto.createHash('sha1').update(id).digest('hex');
};
