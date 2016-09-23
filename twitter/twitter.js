//for textarea, it's value and not textContent
//var tweet = document.querySelector("#newtweet").value

var parent = document.querySelector(".mainbackground");

var child1 = document.createElement("div");
child1.classList.add("fulltweet");
parent.appendChild(child1);

var child2 = document.createElement("div");
child2.classList.add("profilepic");
child1.appendChild(child2);

var child3 = document.createElement("img");
child3.setAttribute("src", "./img/nuraika.jpg");
child3.classList.add("profilepic");
child2.appendChild(child3);

var child4 = document.createElement("div");
child4.classList.add("tweettext");
child2.appendChild(child4);

var child5 = document.createElement("p");
child5.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
child4.appendChild(child5);

var child6 = document.createElement("p");
child4.appendChild(child6);

var child7 = document.createElement("a");
child7.setAttribute("href", "#");
child7.classList.add("tweetlike");
child7.textContent = "Like";
child6.appendChild(child7);

var child8 = document.createElement("span");
child8.classList.add("likecount");
child8.textContent = " (12) ";
child6.appendChild(child8);
