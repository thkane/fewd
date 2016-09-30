//for textarea, it's value and not textContent
//var tweet = document.querySelector("#newtweet").value

var link = document.querySelector(".tweetlike");
var count = document.querySelector(".likeLink");

var form = document.querySelector("#tweetform");
var tweetContent = document.querySelector("#newtweet");

var charNumber = document.querySelector(".charcount");


link.addEventListener("click", like);
form.addEventListener("submit", addTweet);
tweetContent.addEventListener("keyup", decCount);


function like(event) {
  event.preventDefault();

  count.textContent = parseInt(count.textContent) + 1;
}


function addTweet(event) {
  event.preventDefault();

  var parent = document.querySelector(".mainbackground");

  var fulltweetDiv = document.createElement("div");
  fulltweetDiv.classList.add("fulltweet");
  parent.appendChild(fulltweetDiv);

  var profilepicDiv = document.createElement("div");
  profilepicDiv.classList.add("profilepic");
  fulltweetDiv.appendChild(profilepicDiv);

  var profilepicImg = document.createElement("img");
  profilepicImg.setAttribute("src", "./img/tkane_fewd_twitter.jpg");
  profilepicImg.classList.add("profilepic");
  profilepicDiv.appendChild(profilepicImg);

  var tweettextDiv = document.createElement("div");
  tweettextDiv.classList.add("tweettext");
  profilepicDiv.appendChild(tweettextDiv);

  var newTweetText = document.createElement("p");
  newTweetText.textContent = tweetContent.value;
  tweettextDiv.appendChild(newTweetText);

  var child6 = document.createElement("p");
  tweettextDiv.appendChild(child6);

  var likeLink = document.createElement("a");
  likeLink.setAttribute("href", "#");
  likeLink.classList.add("tweetlike");
  likeLink.textContent = "Like";
  child6.appendChild(likeLink);

  var likeCount = document.createElement("span");
  likeCount.classList.add("likeLink");
  likeCount.textContent = " (12) ";
  child6.appendChild(likeCount);

  form.reset();
  charNumber.textContent = 140;
}

function decCount(event) {

//find span and overwrite character count
  charNumber.textContent = 140 - tweetContent.value.length;
}
