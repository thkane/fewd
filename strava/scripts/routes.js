
var generateSegment = document.querySelector("#go");
var findMe = document.querySelector("#findme");

generateSegment.addEventListener("click", findSegment);
findMe.addEventListener("click", geoFind);

var apiKey = "AIzaSyDmqqsWbwD5-3iahKJ39g_yr9et3Ml70mc";

$body = $("body");

$(document).on({
  ajaxStart: function() { $body.addClass("loading");    },
  ajaxStop: function() { $body.removeClass("loading"); }
});

function geoFind(event) {

  navigator.geolocation.getCurrentPosition(storeCoord);

  function storeCoord(position) {
    var latitude_start  = position.coords.latitude;
    var longitude_start = position.coords.longitude;
    document.querySelector("#lat").value = latitude_start;
    document.querySelector("#long").value = longitude_start;
  }
}



function findSegment(event) {
  event.preventDefault();

  // var city  = parseInt(document.querySelector("#city").value);
  // var state = parseInt(document.querySelector("#state").value);

  // var geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?";
  // var full_url = geocode_url + "address=" + city + "," + state + "&key=" + apiKey;
  //
  // $.get(full_url, getCoordinates);

  // function getCoordinates(googapi) {
  //   var latitude_start = googapi.results[0].geometry.location.lat;
  //   var longitude_start = googapi.results[0].geometry.location.long;
  //   return [latitude_start, longitude_start];
  // }

    var latitude_start  = parseInt(document.querySelector("#lat").value);
    var longitude_start = parseInt(document.querySelector("#long").value);

    var area = parseInt(document.querySelector("#area").value);
    var max_cat = parseInt(document.querySelector("#climb").value);
    // var max_cat = 5;

    var latitude_end = latitude_start + (area * 0.01455445222);
    var longitude_end = longitude_start + (area * 0.01455445222);

    var strava_url = "https://crossorigin.me/https://www.strava.com/api/v3/segments/explore?access_token=c95ed5932a9cddcb6595abaaccf6ddb099ea49ff&bounds=" + latitude_start + "," + longitude_start + "," + latitude_end + "," + longitude_end + "&max_cat=" + max_cat;
    $.get(strava_url, listSegments);
    var maps_url = "https://www.google.com/maps/embed/v1/place?q=";
//maybe i just need to nest a bunch of functions?
    function listSegments(results) {
      var segments = results.segments;
      var parent = document.querySelector("body");
      var stravaresults = document.createElement("div");
      stravaresults.classList.add("stravaresults");
      parent.appendChild(stravaresults);
      stravaresults.innerHTML = '<div class="resulttotal">We found ' + segments.length + ' segments for you to check out!</div>'
      console.log(results);

      for (var i = 0; i < segments.length; i++) {
        var newSegment = document.createElement("div");
        newSegment.classList.add("segment");
        var parent = document.querySelector(".stravaresults");
        parent.appendChild(newSegment);
        newSegment.innerHTML = '<div class="segmentdata"><p>Segment name: <a href="https://www.strava.com/segments/'
        + segments[i].id + '" target="_blank">' + segments[i].name + '</a></p><p>Climb rating: '
        + segments[i].climb_category + '</p><p>Distance: ' + (segments[i].distance/1000).toFixed(1)
        + ' km</p></div><div class="map"><iframe width="300" height="225" frameborder="0" style="border:0" src='
        + maps_url + segments[i].start_latlng[0] + "%20" +  segments[i].start_latlng[1] + "&key=" + apiKey
        + ' allowfullscreen></iframe></div>';
      }

    }

  }
