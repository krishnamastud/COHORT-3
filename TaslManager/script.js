const body = document.body;
const themeToggleBtn = document.querySelector("#themeBtn");
const taskList = document.querySelector("#taskContainer");
const addTaskBtn = document.querySelector(".add-btn");

let isForUpdate = null;

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTasks = (taskArray = tasks) => {
  taskList.innerHTML = "";

  taskArray.forEach((task) => {
    taskList.innerHTML += `
      <div class="task-card ${task.completed ? "completed" : ""}">
        
        <div
          onclick="toggleTaskCompletion(${task.id})"
          class="check-box ${task.completed ? "completed" : ""}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h3 class="task-title">${task.taskTitle}</h3>

        <span class="category">${task.category}</span>

        <button onclick="editTask(${task.id})" class="edit">
          Edit
        </button>

        <button onclick="deleteTask(${task.id})" class="delete">
          Delete
        </button>

      </div>
    `;
  });
};

renderTasks();


const taskTitleInput = document.querySelector("#taskTitle");
const categoryInput = document.querySelector("#taskCategory");

addToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let taskTitle = taskTitleInput.value;
  let category = categoryInput.value;
  if(taskTitle.trim() === "" || category.trim() === "") {
    alert("Please fill in both fields.");
    return;
  }

  if (isForUpdate !== null) {
    const task = tasks.find((t) => t.id === isForUpdate);
    task.taskTitle = taskTitle;
    task.category = category;
    isForUpdate = null;
  } else {
    let obj = {
      id: Date.now(),
      taskTitle,
      category,
      completed: false,
    };
    tasks.push(obj);
  }

  addToLocalStorage();
  
  taskTitleInput.value = "";
  categoryInput.value = "";
  renderTasks();
});

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  addToLocalStorage();
  renderTasks();
};

const editTask = (id) => {
  isForUpdate = id;
  const task = tasks.find((t) => t.id === id);

  if (task) {
    taskTitleInput.value = task.taskTitle;
    categoryInput.value = task.category;
  }

};

const checkBox = document.querySelectorAll(".check-box");

const toggleTaskCompletion = (id) => {
  const task = tasks.find((t) => t.id === id);

  if (task) {
    task.completed = !task.completed;
    addToLocalStorage();
    renderTasks();
  }
};

const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  const filteredTasks = tasks.filter((task) =>
    task.taskTitle.toLowerCase().includes(searchTerm)
  );
  
  renderTasks(filteredTasks);
  
})