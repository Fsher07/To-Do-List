export default class taskOperations {
  constructor(index, description, completed) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
  static tasks = [];

  static descriptionInput = document.getElementById('get-task');

  static taskList = document.querySelector('#taskList');

  static addTask = () => {
    const task = new taskOperations(taskOperations.tasks.length, taskOperations.descriptionInput.value, false);

    if (task.description !== '') {
    taskOperations.tasks.push(task);
    localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
    taskOperations.descriptionInput.value = '';
    taskOperations.renderTasks(task);
    }
  }

  static deleteTask = (index) => {
    const taskBlock = document.getElementById(index);
    const taskHolder = document.querySelectorAll('.taskItem');
    taskOperations.tasks = taskOperations.tasks.filter((item) => item.index !== index);
    taskOperations.tasks.forEach((task) => {
      if (task.index > index) {
        task.index -= 1;
      } else {
        task.index = task.index;
      }
    });
    localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
    taskOperations.taskList.removeChild(taskBlock);

    if (taskHolder.length === 0) {
      taskOperations.taskList.innerHTML = '<h2>No tasks yet</h2>';
    } else {
      taskHolder.forEach((task) => {
        if (task.id > index) {
        task.id = task.id - 1;
        } else {
        task.id = task.id;
        }
      });
    }
  }

  static editTask = (index) => {
    const task = taskOperations.tasks.find((item) => item.index === index);
    taskOperations.descriptionInput.value = task.description;
    taskOperations.descriptionInput.focus();
    console.log('hi');

    const deleteBtn = document.querySelectorAll(`#taskList li:last-child span .fa-ellipsis-vertical`);
    deleteBtn.addEventListener('click', () => {
      taskOperations.editTask(task.index);
    });
  }

  // static completeTask = (index) => {
  //   taskOperations.tasks[index].completed = true;
  //   localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
  // }

  // static uncompleteTask = (index) => {
  //   taskOperations.tasks[index].completed = false;
  //   localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
  // }

  // static sortTask = () => {
  //   taskOperations.tasks.sort((a, b) => a.index - b.index);
  //   localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
  // }

  static renderTasks = (task) => {
    const taskHolder = document.createElement('li');
    taskHolder.setAttribute('id', task.index);
    taskHolder.setAttribute('class', 'taskItem');
    taskHolder.innerHTML = `
      <span><input type="checkbox" class="checkbox" ${task.completed ? 'checked' : 'unchecked'}>
      <span>${task.description}</span></span><i class="fa-solid fa-trash-can"></i><span class="fa-solid fa-ellipsis-vertical fa-lg"></span>`;
    taskOperations.taskList.appendChild(taskHolder);

    const deleteBtn = document.querySelector(`#taskList li:last-child i`);
    deleteBtn.addEventListener('click', () => {
      taskOperations.deleteTask(task.index);
    });
  }

  static updateTasks = () => {
    if (localStorage.getItem('datas')) {
      taskOperations.tasks = JSON.parse(localStorage.getItem('datas'));
      taskOperations.tasks.forEach((task) => {
        taskOperations.renderTasks(task);
      });
    } else {
      taskOperations.tasks = [];
    }       
  }

  static init = () => {
    taskOperations.loadTasks();
    taskOperations.renderTasks();
  }

  // static addEventListeners = () => {
  //   const addBtn = document.querySelector('.fa-plus');
  //   const taskList = document.querySelector('#taskList');

  //   addBtn.addEventListener('click', taskOperations.addTask);
  //   taskList.addEventListener('click', (e) => {
  //     if (e.target.classList.contains('fa-ellipsis-vertical')) {
  //       const index = e.target.parentElement.parentElement.id;
  //       if (e.target.parentElement.parentElement.classList.contains('taskItem')) {
  //         taskOperations.deleteTask(index);
  //         taskOperations.renderTasks();
  //       } else if (e.target.parentElement.parentElement.classList.contains('checkbox')) {
  //         if (e.target.parentElement.parentElement.checked) {
  //           taskOperations.completeTask(index);
  //         } else {
  //           taskOperations.uncompleteTask(index);
  //         }
  //         taskOperations.renderTasks();
  //       }
  //     }
  //   });
  // }
}

