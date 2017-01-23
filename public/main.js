console.log('sshhh');

$('.like-btn').on('click', function(evt) {
  var $btn = $(evt.target);
  var id = $btn.data().id; // what is .data().id
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

$('#create').on('click', function(evt) {
  var newSecret = {
    message: $('#secret_message').val()
  }
  $.post('/secrets', newSecret, function(res) {
    console.log(res);
  })
})

// remove button ajax
// using then
// $('.remove-btn').on('click', function(evt) {
//   var $btn = $(evt.target);
//   var id = $btn.data().id;
//   $.ajax({
//     url: '/secrets/' + id,
//     method: 'DELETE',
//   }).then(function(res) {  //then can also be written as success: function(res)
//     console.log(res);
//   })
// });

// remove button ajax
// using success
$('.remove-btn').on('click', function(evt) {
  var $btn = $(evt.target);
  var id = $btn.data().id;
  $.ajax({
    url: '/secrets/' + id,
    method: 'DELETE',
    success: function(result) {
      console.log(result);
    }
  })
});
