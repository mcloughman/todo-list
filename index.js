const todoList = document.querySelector("#todo-list");
const form = document.querySelector("form");
const input = document.querySelector("#new-todo");

let savedTodos = JSON.parse(localStorage.getItem("savedTodos")) || [];
for (let todo of savedTodos) {
  if (todo.isCrossedOut) {
    todo = `<li class="finished">${todo.text}<button class="remove">Remove</button></li>`;
  } else {
    todo = `<li>${todo.text}<button class="remove">Remove</button></li>`;
  }
  todoList.innerHTML += todo;
}

// I need to declare newArr outside of the function I am going to use it in. Perhaps it would be better to use a forEach and use the index to splice the original savedTodos instead of using filter and newarr
let newArr = [];

function removeTodo(str) {
  newArr = savedTodos.filter((savedTodo) => {
    return savedTodo.text !== str;
  });
  return newArr;
}

function toggleIsCrossedOut(str) {
  for (let todo of savedTodos) {
    if (todo.text === str) {
      todo.isCrossedOut = !todo.isCrossedOut;
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) return;
  const newTodo = document.createElement("li");
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.classList.add("remove");
  newTodo.innerText = input.value;
  todoList.append(newTodo);
  console.log(todoList);
  newTodo.append(removeBtn);
  // Need to update localStorage when we add a new todo
  savedTodos.push({
    text: input.value,
    isCrossedOut: false,
  });
  console.log(savedTodos);
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos));
  input.value = "";
});

todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    // i would have used innerText for the below, but it had \n in each case -- wasn't sure how to deal so looked for other roads to victory
    const todoToRemove = e.target.parentElement.childNodes[0].textContent;
    // helper function
    removeTodo(todoToRemove);
    // the below might just be completely unnecessary
    savedTodos = [...newArr];
    localStorage.setItem("savedTodos", JSON.stringify(savedTodos));
    e.target.parentElement.remove();
  }
});
todoList.addEventListener("click", (e) => {
  // event delegation again -- clicking on the li needs to be different than clicking the remove button
  if (e.target.tagName === "LI") {
    const listItem = e.target;
    listItem.classList.toggle("finished");
    const strToCheck = e.target.childNodes[0].textContent;
    // helper function
    toggleIsCrossedOut(strToCheck);
    localStorage.setItem("savedTodos", JSON.stringify(savedTodos));
  }
});
