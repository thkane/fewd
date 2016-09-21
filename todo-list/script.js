var form = document.querySelector("#new-item-form");

function formSubmitted(event) {
  event.preventDefault();

  // Your code goes here...
  var a = document.querySelector("#new-item-input");
  var list = document.querySelector("ul");
  var newToDo = document.createElement("li");
  newToDo.classList.add("todo-list");
  list.appendChild(newToDo);


  form.reset();
}

form.addEventListener("submit", formSubmitted);
