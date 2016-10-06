var todoEntry = document.querySelector("#new-todo-body");
var form = document.querySelector("#new-todo");
var toDoHolder = document.querySelector("main");
var toDoNumber = document.querySelector(".todo-number");

form.addEventListener("submit", addToDo);

function addToDo(event) {
  event.preventDefault();

  var toDoArray = todoEntry.value.split(",");

  for (var i = 0; i < toDoArray.length; i++) {
    var new_li = document.createElement("li");
    toDoHolder.appendChild(new_li);
    var new_label = document.createElement("label");
    new_li.appendChild(new_label);
    var new_input = document.createElement("input");
    new_label.appendChild(new_input);
    new_input.setAttribute("type","checkbox");
    var newToDo = document.createElement("span");
    new_label.appendChild(newToDo);
    newToDo.textContent = " " + toDoArray[i];

    //update todo count
    var count = parseInt(toDoNumber.textContent);
    toDoNumber.textContent = count + 1;

  }

  //hide default text
  var nothing = document.querySelector(".nothing");
  nothing.style.display = "none";

  form.reset();

}
