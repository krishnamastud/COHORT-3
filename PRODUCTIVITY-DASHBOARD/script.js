// theame toggle
const html = document.querySelector("html");
const themeToggle = document.querySelector("#themeToggle");

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
});

// display feature

const viewTodoCardBtn = document.querySelector(".todo-card");
const viewDashboard = document.querySelector(".dashboard");
const todoFeature = document.querySelector("#view-todo");
const backToDashboardBtn = document.querySelectorAll(".back-btn");
const pomoFeature = document.querySelector("#viewPomodoro");
const viewPomodoroCardBtn = document.querySelector(".pomodoro-card");

backToDashboardBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    viewDashboard.style.display = "inline";
    todoFeature.style.display = "none";
    pomoFeature.style.display = "none";
  });
});

viewTodoCardBtn.addEventListener("click", () => {
  viewDashboard.style.display = "none";
  todoFeature.style.display = "inline";
});

viewPomodoroCardBtn.addEventListener("click", () => {
  viewDashboard.style.display = "none";
  pomoFeature.style.display = "inline";
});



// todo feature

const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const addTodoBtn = document.querySelector("#todoAddBtn");

const todoData = [
  {
    task: "Complete the project report",
    completed: false,
    important: true,
  },
  {
    task: "Attend team meeting",
    completed: false,
    important: false,
  },
  {
    task: "Review code changes",
    completed: false,
    important: false,
  },
  {
    task: "Prepare presentation slides",
    completed: false,
    important: true,
  },
  {
    task: "Update project documentation",
    completed: false,
    important: false,
  },
];

const renderTodoList = () => {
  todoList.innerHTML = "";
  if (todoData.length === 0) {
    todoList.innerHTML = `<div class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M9 11l3 3 8-8" />
              <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
            </svg>
            <p>Nothing on your list yet. Add your first task above.</p>
          </div>`;
  } else {
    todoData.forEach((todo, index) => {
      todoList.innerHTML += `<div class="todo">
            <div class="todo-left">
              <button onclick="toggleComplete(${index})" class="todo-check" data-action="toggle" aria-label="Toggle complete">
              
            <div class="completed toggle-check">
                <svg id="todo-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
            </button>
            <div class="todo-text">${todo.task}</div>
          </div>
          <div class="todo-actions">
            <button class="btn-icon" data-action="important" aria-label="Mark important">
              <svg viewBox="0 0 24 24" stroke="currentColor"
                stroke-width="2">
                <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
              </svg>
            </button>
            <button onclick="deleteTodo(${index})" class="btn-icon  delete-btn" aria-label="Delete task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-9 0v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6" />
              </svg>
            </button>
          </div>
        </div>`;
    });
  }
};

renderTodoList();

const todocheck = document.querySelector(".todo-check");

let sequence = 0;

function addTodoItem() {
  value = todoInput.value.trim();
  if (value) {
    todoData.push({
      id: ++sequence,
      task: value,
      completed: false,
      important: false,
    });
  }
}

addTodoBtn.addEventListener("click", () => {
  addTodoItem();
  renderTodoList();
  todoInput.value = "";
});

const deleteTodo = (index) => {
  todoData.splice(index, 1);
  renderTodoList();
};

toggleComplete = (index) => {
  todoData[index].completed = !todoData[index].completed;

  const toggleCheck = document.querySelectorAll(".toggle-check");

  toggleCheck.forEach((check, i) => {
    if (i === index) {
      check.classList.toggle("completed");
    }
  });
};

// pomodoro timer

const timerStartBtn = document.querySelector("#pomoStart");
const pomoTimerDisplay = document.querySelector("#pomoTime");
const timerResetBtn = document.querySelector("#pomoReset");
const pomoSkip = document.querySelector("#pomoSkip");

let isRunning = false;
  let minutes = 25;
  let seconds = 0;

const updateTimerDisplay = () => {
  pomoTimerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

timerStartBtn.addEventListener("click", () => {
  if (!isRunning) {

    intervalId = setInterval(() => {
      if (seconds === 0 && minutes === 0) {
        clearInterval(intervalId);
        isRunning = false;
        return;
      }

      if (seconds === 0) {
        minutes--;
        seconds = 59;
      }else {
        seconds--;
      }
      updateTimerDisplay();
    }, 1000);
    isRunning = true;
  }else {
    clearInterval(intervalId);
    isRunning = false;
  }
})

timerResetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  isRunning = false;
  minutes = 25;
  seconds = 0;
  updateTimerDisplay();
})

pomoSkip.addEventListener('click', () => {
  clearInterval(intervalId);
  isRunning = false;
  minutes = 0;
  seconds = 0;
  updateTimerDisplay();
})