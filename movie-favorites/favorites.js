var first = document.querySelector("#tt0088763");
var second = document.querySelector("#tt0128445");
var third = document.querySelector("#tt0335266");
var fourth = document.querySelector("#tt0080455");

var movieTitle = document.querySelector("#title");
var movieYear = document.querySelector("#year");
var movieRating = document.querySelector("#rating");
var movieRuntime = document.querySelector("#runtime");
var moviePlot = document.querySelector("#plot");


first.addEventListener("click", getMovie);
second.addEventListener("click", getMovie);
third.addEventListener("click", getMovie);
fourth.addEventListener("click", getMovie);


// One event handler to rule them all...
function getMovie(event) {
  var clickedMovie = event.target;
  var imdbID = clickedMovie.id;
  console.log(imdbID);
  var url = "https://omdbapi.com/?i=" + imdbID;

  $.get(url, displayResults);

}


function displayResults(results) {
  movieTitle.textContent = results.Title;
  movieYear.textContent = results.Year;
  movieRating.textContent = results.Rated;
  movieRuntime.textContent = results.Runtime;
  moviePlot.textContent = results.Plot;


}
