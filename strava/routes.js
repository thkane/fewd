
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

    var url = "https://crossorigin.me/https://www.strava.com/api/v3/segments/explore?access_token=c95ed5932a9cddcb6595abaaccf6ddb099ea49ff&bounds=" + latitude_start + "," + longitude_start + "," + latitude_end + "," + longitude_end + "&max_cat=" + max_cat;

    $.get(url, listSegments);
    // function displayResults(results) {
    //     console.log(results);
    // }

    function listSegments(results) {

      console.log(results);

      var parent = document.querySelector(".segmentbox");

      for (var i = 0; i < results.length; i++) {
        var newSegment = document.createElement("div");
        newSegment.classList.add(".segment");
        parent.appendChild(newSegment);
        newSegment.textContent = results.segments[i].name;
      }
    }

  }

navigator.geolocation.getCurrentPosition(success);

}
