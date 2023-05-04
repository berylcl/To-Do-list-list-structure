const tasks = JSON.parse(localStorage.getItem('tasks'));

function updateStatus(index, completed) {
  tasks[index].completed = completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default updateStatus;
