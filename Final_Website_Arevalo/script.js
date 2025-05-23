var taskInput = document.getElementById("taskInput");
var deadlineInput = document.getElementById("deadlineInput");
var addButton = document.getElementById("addButton");
var taskList = document.getElementById("taskList");

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

showTasks();

addButton.addEventListener("click", function() {
  addTask();
});

taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

deadlineInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  var newTask = taskInput.value.trim();
  var deadline = deadlineInput.value;

  if (newTask === "") {
    alert("Please enter a task!");
    return;
  }

  if (deadline === "") {
    alert("Please select a deadline date!");
    return;
  }

  tasks.push({ text: newTask, completed: false, deadline: deadline });
  taskInput.value = "";
  deadlineInput.value = "";
  saveTasks();
  showTasks();
}

function showTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    var li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function() {
      tasks[i].completed = checkbox.checked;
      saveTasks();
      showTasks();
    });

    var span = document.createElement("span");
    span.textContent = task.text;
    span.className = "toggle";

    var date = document.createElement("div");
    date.className = "task-date";
    if (task.deadline) date.textContent = "Deadline: " + task.deadline;

    var info = document.createElement("div");
    info.className = "task-info";
    info.appendChild(checkbox);
    info.appendChild(span);
    if (task.deadline) info.appendChild(date);

    var button = document.createElement("button");
    button.textContent = "Delete";
    button.className = "delete-btn";
    button.addEventListener("click", function() {
      tasks.splice(i, 1);
      saveTasks();
      showTasks();
    });

    li.appendChild(info);
    li.appendChild(button);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
