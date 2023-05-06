function updateStatus(index, completed) {
  let tasks = JSON.parse(localStorage.getItem('tasks') || []);
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  if (tasks[index]) {
    tasks[index].completed = completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export default updateStatus;
