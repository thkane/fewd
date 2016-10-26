
var generateSegment = document.querySelector("#go");
var findLocation = document.querySelector("#findme");
var findUser = document.querySelector("#findmylocation");

generateSegment.addEventListener("click", findSegment);
findLocation.addEventListener("click", geoFind);
findUser.addEventListener("click", geoFindUser);

var apiKey = "AIzaSyDmqqsWbwD5-3iahKJ39g_yr9et3Ml70mc";

// $body = $("body");
//
// $(document).on({
//     ajaxStart: function() { $body.addClass("loading");    },
//      ajaxStop: function() { $body.removeClass("loading"); }
// });

function geoFindUser(event) {

  navigator.geolocation.getCurrentPosition(storeCoord);


  function storeCoord(position) {
    var latitude_start  = position.coords.latitude;
    var longitude_start = position.coords.longitude;
    fillLatLong(latitude_start,longitude_start);
  }

}

function geoFind(event) {

  var city  = document.querySelector("#user_city").value;
  var state = document.querySelector("#user_state").value;

  var geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?";
  var full_url = geocode_url + "address=" + city + "," + state + "&key=" + apiKey;

  $.get(full_url, getCoordinates);

  function getCoordinates(googapi) {
    var latitude_start = googapi.results[0].geometry.location.lat;
    var longitude_start = googapi.results[0].geometry.location.lng;
    fillLatLong(latitude_start,longitude_start);
  }



}

function fillLatLong(lat,long) {
  document.querySelector("#geotell_lat").textContent = lat + "°";
  document.querySelector("#geotell_long").textContent = long + "°";
  document.querySelector("#confirm").style.display = "block";
  document.querySelector("#area_q").style.display = "block";
  document.querySelector("#climb_q").style.display = "block";
  document.querySelector("#go").style.display = "inline";
  document.querySelector(".bottom_form").style.borderTop = "1px solid black";

}


function findSegment(event) {
  event.preventDefault();


  // if (city == "" || state = "") {
  //   latitude_start = document.querySelector("#geotell_lat").value;
  //   longitude_start = document.querySelector("#geotell_long").value;

  // }

   var latitude_start = parseInt(document.querySelector("#geotell_lat").textContent);
   var longitude_start = parseInt(document.querySelector("#geotell_long").textContent);

    var area = parseInt(document.querySelector("#area").value);
    var max_cat = parseInt(document.querySelector("#climb").value);

    var latitude_end = latitude_start + (area * 0.01455445222);
    var longitude_end = longitude_start + (area * 0.01455445222);

    var maps_url = "https://www.google.com/maps/embed/v1/directions?key=" + apiKey;

    var strava_url = "https://crossorigin.me/https://www.strava.com/api/v3/segments/explore?access_token=c95ed5932a9cddcb6595abaaccf6ddb099ea49ff&bounds=" + latitude_start + "," + longitude_start + "," + latitude_end + "," + longitude_end + "&max_cat=" + max_cat;
    $.get(strava_url, listSegments);

    function listSegments(results) {
      var segments = results.segments;
      var stravaresults = document.createElement("div");
      stravaresults.id = "stravaresults";
      $(stravaresults).insertBefore( "#credit" );
      stravaresults.innerHTML = '<div class="resulttotal">We found ' + segments.length + ' segments for you to check out!</div>'

      for (var i = 0; i < segments.length; i++) {
        var newSegment = document.createElement("div");
        newSegment.classList.add("segment");
        var parent = document.querySelector("#stravaresults");
        parent.appendChild(newSegment);
        newSegment.innerHTML = '<div class="segmentdata"><p>Segment name: <a href="https://www.strava.com/segments/'
        + segments[i].id + '" target="_blank">' + segments[i].name + '</a></p><p>Climb rating: '
        + segments[i].climb_category + '</p><p>Distance: ' + (segments[i].distance * 0.000621371).toFixed(1)
        + ' miles</p></div><div class="map"><iframe width="300" height="225" frameborder="0" style="border:0" src='
        + maps_url + '&origin=' + segments[i].start_latlng[0] + ','+ segments[i].start_latlng[1] + '&destination=' +  segments[i].end_latlng[0] + ',' + segments[i].end_latlng[1] + '&mode=bicycling allowfullscreen></iframe></div>';
      }

    }

  }
