function makeHomeTab(){
  $('#tab-content')
    .append('<h1> Delicious Restaurant </h1>')
    .append('<img src="food.jpg" />')
    .append('<p> We have the most delicious food! </p>')
}

function makeContactTab(){
  $('#tab-content')
    .append('<h1> Contact us </h1>')
    .append('<p> Our phone number is (555)123-4567 </p>')
}

function makeMenuTab(){
  $('#tab-content')
    .append('<h1> Menu </h1>')
    .append('<ul>')
    .append('<li> thing 1 </li>')
    .append('<li> thing 2 </li>')
    .append('</ul>')
}

$('.tabs li').click(function(){
  var tabName = $(this).text().trim();
  $('.active').removeClass('active');
  $(this).addClass('active');
  var methodName = 'make' + tabName + 'Tab';
  $('#tab-content').empty();
  window[methodName]();
});

makeHomeTab();