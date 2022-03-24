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
    taskOperations.tasks.splice(index, 1);
    localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
    taskOperations.taskList.removeChild(taskBlock);
  }

  // static completeTask = (index) => {
  //   taskOperations.tasks[index].completed = true;
  //   localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
  // }

  // static uncompleteTask = (index) => {
  //   taskOperations.tasks[index].completed = false;
  //   localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
  // }

  static sortTask = () => {
    taskOperations.tasks.sort((a, b) => a.index - b.index);
    localStorage.setItem('datas', JSON.stringify(taskOperations.tasks));
  }

  static renderTasks = (task) => {
      taskOperations.taskList.innerHTML += `
        <li id="${task.index}" class="taskItem"><span><input type="checkbox" class="checkbox" ${task.completed ? 'checked' : 'unchecked'}>
        <span>${task.description}</span></span><i class="fa-solid fa-trash-can"></i><span class="fa-solid fa-ellipsis-vertical fa-lg"></span></li> <hr>`;
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

