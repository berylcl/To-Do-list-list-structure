import './index.css';

let tasks = [];
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function updateIndexes() {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
}
function addTask(description) {
  const task = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(task);
  updateIndexes();
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateIndexes();
  saveTasks();
}

function displayTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
          <input type="checkbox" ${task.completed ? 'checked' : ''} />
          <span class="taskdesc ${task.completed ? 'strikethrough' : ''}">${task.description}</span>
          <!--<span class="taskdesc">${task.description}</span>-->
          <i class="bi bi-pencil-square edit-task"></i>
          <i class="bi bi-trash delete-task"></i>
        `;
    todoList.appendChild(listItem);

    // Add event listener to checkbox input
    const checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      displayTasks();
    });

    // Add event listener to edit icon
    const editIcon = listItem.querySelector('.edit-task');
    editIcon.addEventListener('click', () => {
      const taskDesc = listItem.querySelector('.taskdesc');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = taskDesc.innerText;
      input.classList.add('edit-input');
      taskDesc.replaceWith(input);

      // Add event listener to edit input to save changes
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newDesc = input.value.trim();
          if (newDesc.length > 0) {
            task.description = newDesc;
            taskDesc.innerText = newDesc;
            input.replaceWith(taskDesc);
            saveTasks();
          }
        }
      });
    });

    // Add event listener to delete icon
    const deleteIcon = listItem.querySelector('.delete-task');
    deleteIcon.addEventListener('click', () => {
      deleteTask(index);
      displayTasks();
    });
    const taskItem = listItem.querySelector('span.taskdesc');
    taskItem.addEventListener('click', () => {
      listItem.classList.toggle('selected');
      deleteIcon.classList.toggle('visible');
      editIcon.classList.toggle('visible');
      if (listItem.classList.contains('selected')) {
        listItem.style.backgroundColor = '#f0f0f0';
      } else {
        listItem.style.backgroundColor = '';
      }
    });
  });
}
displayTasks();
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('your-todo');
  const description = input.value.trim();
  if (description !== '') {
    addTask(description);
    input.value = '';
    displayTasks();
  }
});

const clearAllBtn = document.getElementById('clear-all');
clearAllBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  updateIndexes();
  saveTasks();
  displayTasks();
});
