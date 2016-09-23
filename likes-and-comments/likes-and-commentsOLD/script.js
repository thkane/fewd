var link = document.querySelector(".like-link");
var count = document.querySelector(".like-count");
var form = document.querySelector("#new-comment");


link.addEventListener("click", like);
form.addEventListener("submit", comment);

function like(event) {
  event.preventDefault();

// Your code for like goes here
count.textContent = parseInt(count.textContent) + 1;

}

function comment(event) {
  event.preventDefault();

  // Your code for comments goes here

//we need to capture the text in the form

var newCommentText = document.querySelector("#new-comment-body");

//create an additional element with the class comment
var newComment = document.createElement("div");

//assign it to the class "comment"
newComment.classList.add("comment");

//select parent element we want to add new comment to
var getCommentDiv = document.querySelector("comments");

//add the new element
getCommentDiv.appendChild(newComment);



//then write the variable into the new element



}
