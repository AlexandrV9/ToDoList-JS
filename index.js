const inputAddTask = document.querySelector(".to-do-list__input_type_add-task");
const buttonSubmitAddTask = document.querySelector(
  ".to-do-list__button_type_add-task"
);
const taskList = document.querySelector(".to-do-list__task-list");

const taskItemTemplate = document.querySelector("#task-item-template").content;

let valueInputAddTask = "";

let tasks = [
  { id: 1, text: "Полить цветы" },
  { id: 2, text: "Сходить в магазин" },
];

// ---------------- ФУНКЦИИ ----------------

const handleAddNewTask = (text, id) => {
  const newTaskItem = taskItemTemplate.querySelector(".to-do-list__task-item").cloneNode(true);
  const taskItemInput = newTaskItem.querySelector(".to-do-list__input_task-item");
  const taskItemNumber = newTaskItem.querySelector(".to-do-list__task-item-number");
  const taskItemEditButton = newTaskItem.querySelector(".to-do-list__task-item-button_type_edit");
  const taskItemDeleteButton = newTaskItem.querySelector(".to-do-list__task-item-button_type_delete");

  taskItemDeleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    newTaskItem.remove();

    tasks = tasks.filter((item) => {
      return Number(taskItemNumber.textContent) !== item.id;
    });
    tasks.forEach((item, index) => {
      item.id = index + 1;
    });

    const currentListTaskItems = document.querySelectorAll(".to-do-list__task-item");
    currentListTaskItems.forEach((item, index) => {
      item.querySelector(".to-do-list__task-item-number").textContent =
        index + 1;
    });
  });

  let isClick = false;

  // Выход из режима редактирования текста
  const exitEditModeTaskItem = () => {
    taskItemInput.setAttribute("disabled", true);
    taskItemEditButton.classList.remove("active");
    isClick = false;
  };

  // Выход из режима редактирования нажатием на клавиши Enter или Esc
  const handleTaskItemInputKeyDown = (event) => {
    if (event.code === "Enter" || event.code === "Escape") {
      exitEditModeTaskItem();
    }
  };

  taskItemEditButton.addEventListener("click", (event) => {
    event.preventDefault();
    isClick = !isClick;
    if (isClick) {
      taskItemInput.removeAttribute("disabled");
      taskItemInput.focus();
      taskItemEditButton.classList.add("active");
    } else {
      exitEditModeTaskItem();
    }
    taskItemInput.addEventListener("blur", exitEditModeTaskItem, {
      once: true,
    });
    taskItemInput.addEventListener("keydown", handleTaskItemInputKeyDown);
  });

  taskItemInput.value = text;
  taskItemNumber.textContent = id;

  return newTaskItem;
};

tasks.forEach((item) => {
  const text = item.text;
  const id = item.id;
  const newTask = handleAddNewTask(text, id);
  taskList.append(newTask);
});

inputAddTask.addEventListener("input", (event) => {
  valueInputAddTask = event.target.value;
});

buttonSubmitAddTask.addEventListener("click", (event) => {
  event.preventDefault();

  if (!valueInputAddTask) {
    console.log("Поле пустое");
  } else {
    let id = tasks.length + 1;

    tasks.push({ id, text: valueInputAddTask });

    const newTask = handleAddNewTask(valueInputAddTask, id);

    taskList.append(newTask);

    inputAddTask.value = "";
    valueInputAddTask = "";
  }
});
