//what do we want to do here...
//taking input from textarea and adding it to list
//so let's get the input from the textarea
var todoEntry = document.querySelector("#new-todo-body");
var form = document.querySelector("#new-todo");
var toDoHolder = document.querySelector("main");
var toDoNumber = document.querySelector(".todo-number");

form.addEventListener("submit", addToDo);


function addToDo(event) {
  event.preventDefault();

  //add new todo
  var new_li = document.createElement("li");
  toDoHolder.appendChild(new_li);
  var new_label = document.createElement("label");
  new_li.appendChild(new_label);
  var new_input = document.createElement("input");
  new_label.appendChild(new_input);
  new_input.setAttribute("type","checkbox");
  var newToDo = document.createElement("span");
  new_label.appendChild(newToDo);
  newToDo.textContent = " " + todoEntry.value;

  //update todo count
  var count = parseInt(toDoNumber.textContent);
  toDoNumber.textContent = count + 1;

  //hide default text
  var nothing = document.querySelector(".nothing");
  nothing.style.display = "none";

  form.reset();

}
