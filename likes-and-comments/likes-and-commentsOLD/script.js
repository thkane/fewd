var link = document.querySelector(".like-link");
var count = document.querySelector(".like-count");

var form = document.querySelector("#new-comment");
var commentBox = document.querySelector("#new-comment-body");
var commentBlock = document.querySelector("#comments");



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

var newComment = document.createElement("div");
newComment.classList.add("comment");
newComment.textContent = commentBox.value;
commentBlock.appendChild(newComment);


}
