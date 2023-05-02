import './index.css';

const tasks = [
  { description: 'Learn Webpack', completed: true, index: 0 },
  { description: 'Finish quiz', completed: false, index: 1 },
  { description: 'Learn supplication', completed: false, index: 2 },
  { description: 'Wash utensils', completed: true, index: 3 },
];

function displayTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} />
      <span class="taskdesc">${task.description}</span>
      <i class="bi bi-three-dots-vertical"></i>
    `;
    todoList.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayTasks();
});