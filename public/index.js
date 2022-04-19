// public/index.js
const IAM = { token: null };
socket.on('token', data => {
  IAM.token = data.token;
});

$(() => {
  $('input').change(function() {
    let text = $(this).val();
    if (text === null) {
      $('button').prop('disabled', true);
    } else {
      $('button').prop('disabled', false);
    };
  });


  const socket = io();
  $('form').submit(e => {
    e.preventDefault();

    socket.emit('post', {
      msg: $('#m').val(),
      token: IAM.token,
    });

    $('#m').val('');
    $('button').prop('disabled', true);

    return false;
  });

  socket.on('msg', res => {
    if (res.token === IAM.token) {
      $('#messages').append($('<li class="mine">').text(res.msg));
    } else {
      $('#messages').append($('<li class="others">').text(res.msg));
    }
  });
});
