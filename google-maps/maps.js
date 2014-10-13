// Thanks to http://stackoverflow.com/a/1186309/863846 for this
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

(function(){
  var map = new Map();

  function Map() {
    var map;
    this.init = function(){
      var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
        zoom: 8
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
      return(this);
    };

    this.createMarker = function(lat, lng, message) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: message
      });
      var infowindow = new google.maps.InfoWindow({
          content: message
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
      return marker;
    };

    this.init();
  };

  $(function() {
    map.init();
    $('form').submit(function(e) {
      e.preventDefault()
      var input = $(e.target).serializeObject();
      map.createMarker(input.lat, input.lng, input.message);
    });
  });

}())
