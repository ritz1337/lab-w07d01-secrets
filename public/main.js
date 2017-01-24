console.log('sshhh');

$('#create').on('click', function(evt) {
  $('#secret_message').val('');
  var newSecret = {
    message: $('#secret_message').val()
  }
  $.post('/secrets', newSecret, function(res) {
    var secret = res.ops[0];
    var html = render(secret);
    $('#secrets').append(html);
  });
});

$('#secrets').on('click', '.remove-btn', function(evt) {
  var $btn = $(evt.target);
  var id = $btn.data().id;
  $.ajax({
    url: '/secrets/' + id,
    method: "DELETE"
  }).then(function(res) {
    $btn.closest('.secret').remove();
  })
});

$('#secrets').on('click', '.like-btn', function(evt) {
  var $btn = $(evt.target);
  var id = $btn.data().id;
  $.post('/secrets/' + id + '/likes', function(res) {
    console.log(res);
    var secret = res.value;
    var html = render(secret);
    $btn.closest('.secret').html(html);
  });
});

function render(secret) {
  var temp = $('template').html();
  var compile = Handlebars.compile(temp);
  return compile({secret: secret});
}
