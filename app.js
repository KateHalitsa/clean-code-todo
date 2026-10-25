const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(
  "#topSectionForAddingElementToList button",
);
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createDeleteButton = function () {
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";

  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(createDeleteButton());

  return listItem;
};

const toggleTaskStatus = function () {
  const targetTaskList = this.checked
    ? completedTasksHolder
    : incompleteTaskHolder;

  targetTaskList.appendChild(this.parentNode);
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const isEditing = listItem.classList.contains("editMode");
  if (isEditing) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskStatus;
};

const bindEventsToTaskList = function (targetTaskList) {
  for (let i = 0; i < targetTaskList.children.length; i++) {
    bindTaskEvents(targetTaskList.children[i]);
  }
};

addButton.addEventListener("click", addTask);

bindEventsToTaskList(incompleteTaskHolder);
bindEventsToTaskList(completedTasksHolder);
