export default class taskOperations {
  constructor(index, description, completed) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
  static tasks = [];

  static descriptionInput = document.getElementById('get-task');

  static addTask = () => {
    const task = new taskOperations(taskOperations.tasks.length, taskOperations.descriptionInput.value, false);

    if (task.description !== '') {
    taskOperations.tasks.push(task);
    localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
    taskOperations.descriptionInput.value = '';
    }
  }
}