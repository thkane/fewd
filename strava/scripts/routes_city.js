
var generateSegment = document.querySelector("#go");
var findMe = document.querySelector("#findme");

generateSegment.addEventListener("click", findSegment);
findMe.addEventListener("click", geoFind);

var apiKey = "AIzaSyDmqqsWbwD5-3iahKJ39g_yr9et3Ml70mc";

// removing for new solution
// $body = $("body");
//
// $(document).on({
//   ajaxStart: function() { $body.addClass("loading");    },
//   ajaxStop: function() { $body.removeClass("loading"); }
// });

// $('#go').click(function(){
//     $('#stravaresults').html("Loading in 3 seconds...");
//     $('#spinBox').show().spin();
//     $.ajax({
//     method: 'POST',
//     url: '/echo/html/',
//     data: {
//       html: 'Data received!',
//       delay: 3
//     },
//     success: function(data) {
//       $('#stravaresults').html(data);
//       $('#spinBox').hide().spin(false);
//     }
//   });
// });

function geoFind(event) {

  // navigator.geolocation.getCurrentPosition(storeCoord);

  var city  = document.querySelector("#user_city").value;
  var state = document.querySelector("#user_state").value;

  var geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?";
  var full_url = geocode_url + "address=" + city + "," + state + "&key=" + apiKey;

  $.get(full_url, getCoordinates);

  function getCoordinates(googapi) {
    var latitude_start = googapi.results[0].geometry.location.lat;
    var longitude_start = googapi.results[0].geometry.location.lng;
    document.querySelector("#geotell_lat").textContent = latitude_start + "°";
    document.querySelector("#geotell_long").textContent = longitude_start + "°";
    document.querySelector("#confirm").style.display = "block";
    document.querySelector("#area_q").style.display = "block";
    document.querySelector("#climb_q").style.display = "block";
    document.querySelector("#go").style.display = "inline";

  }



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
      stravaresults.id = "stravaresults";
      parent.appendChild(stravaresults);
      stravaresults.innerHTML = '<div class="resulttotal">We found ' + segments.length + ' segments for you to check out!</div>'

      for (var i = 0; i < segments.length; i++) {
        var newSegment = document.createElement("div");
        newSegment.classList.add("segment");
        var parent = document.querySelector("#stravaresults");
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
