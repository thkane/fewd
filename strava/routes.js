
var generateSegment = document.querySelector("#go");

generateSegment.addEventListener("click", findSegment);

function findSegment(event) {
  event.preventDefault();

  function success(position) {

    var latitude_start  = position.coords.latitude;
    var longitude_start = position.coords.longitude;

    var area = parseInt(document.querySelector("#area").value);
    var max_cat = parseInt(document.querySelector("#climb").value);

    var latitude_end = latitude_start + (area * 0.01455445222);
    var longitude_end = longitude_end + (area * 0.01455445222);

    var output = document.querySelector("#out");
    output.innerHTML = '<div class="data">Latitude is <span id="lat1">' + latitude_start + '</span>°<br>Longitude is <span id="long1">' + longitude_start + '</span>°</div>';

    var strava_url = "https://crossorigin.me/https://www.strava.com/api/v3/segments/explore?access_token=c95ed5932a9cddcb6595abaaccf6ddb099ea49ff&bounds=" + latitude_start + "," + longitude_start + "," + latitude_end + "," + longitude_end + "&max_cat=" + max_cat;
    $.get(strava_url, listSegments);

    var maps_url = "https://www.google.com/maps/embed/v1/place?q=";
    var apiKey = "AIzaSyDmqqsWbwD5-3iahKJ39g_yr9et3Ml70mc";

    function listSegments(results) {
      var segments = results.segments;
      var parent = document.querySelector(".stravaresults");

      for (var i = 0; i < segments.length; i++) {
        var newSegment = document.createElement("div");
        newSegment.classList.add("segment");
        parent.appendChild(newSegment);
        newSegment.innerHTML = '<div class="segmentdata"><p>Segment name: <a href="https://www.strava.com/segments/'  + segments[i].id + '" target="_blank">' + segments[i].name + '</a></p><p>Climb rating: ' + segments[i].climb_category + '</p><p>Distance: ' + segments[i].distance/1000 + ' km</p></div><div class="map"><iframe width="300" height="225" frameborder="0" style="border:0" src=' + maps_url + segments[i].start_latlng[0] + "%20" +  segments[i].start_latlng[1] + "&key=" + apiKey + ' allowfullscreen></iframe></div>';
      }

    }

  }

navigator.geolocation.getCurrentPosition(success);

}
