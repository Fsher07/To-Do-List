export default class TaskOperations {
  constructor(index, description, completed) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }

  static tasks = [];

  static descriptionInput = document.getElementById('get-task');

  static taskList = document.querySelector('#taskList');

  static addTask = () => {
    const Task = new TaskOperations(TaskOperations.tasks.length,
      TaskOperations.descriptionInput.value, false);

    if (Task.description !== '') {
      TaskOperations.tasks.push(Task);
      localStorage.setItem('datas', JSON.stringify(TaskOperations.tasks));
      TaskOperations.descriptionInput.value = '';
      TaskOperations.renderTasks(Task);
    }
  }

  static deleteTask = (index) => {
    const taskBlock = document.getElementById(index);
    const taskHolder = document.querySelectorAll('.taskItem');
    TaskOperations.tasks = TaskOperations.tasks.filter((item) => item.index !== index);
    TaskOperations.tasks.forEach((task) => {
      if (task.index > index) {
        task.index -= 1;
      }
    });
    localStorage.setItem('datas', JSON.stringify(TaskOperations.tasks));
    TaskOperations.taskList.removeChild(taskBlock);

    if (taskHolder.length === 0) {
      TaskOperations.taskList.innerHTML = '<h2>No tasks yet</h2>';
    } else {
      taskHolder.forEach((task) => {
        if (task.id > index) {
          task.id -= 1;
        }
      });
    }
  }

  static editTask = (index) => {
    document.querySelectorAll('#taskList li span .editDescription').forEach((node) => {
      node.ondblclick = function createEditInput() {
        const val = this.innerHTML;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'editInputBox';
        input.value = val;
        this.innerHTML = '';
        this.appendChild(input);
        input.focus();
        input.onblur = function setLocalStorageAgain() {
          const val = this.value;
          this.parentNode.innerHTML = val;
          TaskOperations.tasks.forEach((task) => {
            if (task.index === index) {
              task.description = input.value;
              localStorage.setItem('datas', JSON.stringify(TaskOperations.tasks));
            }
          });
        };
      };
    });
  }

  // static completeTask = (index) => {
  //   TaskOperations.tasks[index].completed = true;
  //   localStorage.setItem('datas', JSON.stringify(TaskOperations.tasks));
  // }

  // static uncompleteTask = (index) => {
  //   TaskOperations.tasks[index].completed = false;
  //   localStorage.setItem('datas', JSON.stringify(TaskOperations.tasks));
  // }

  // static sortTask = () => {
  //   TaskOperations.tasks.sort((a, b) => a.index - b.index);
  //   localStorage.setItem('datas', JSON.stringify(TaskOperations.tasks));
  // }

  static renderTasks = (task) => {
    const taskHolder = document.createElement('li');
    taskHolder.setAttribute('id', task.index);
    taskHolder.setAttribute('class', 'taskItem');
    taskHolder.innerHTML = `
      <span><input type="checkbox" class="checkbox" ${task.completed ? 'checked' : 'unchecked'}>
      <span class="editDescription">${task.description}</span></span><span class="btnHolder"><i class="fa-solid fa-trash-can"></i><span class="fa-solid fa-ellipsis-vertical fa-lg"></span></span>`;
    TaskOperations.taskList.appendChild(taskHolder);

    const deleteBtn = document.querySelector('#taskList li:last-child i');
    deleteBtn.addEventListener('click', () => {
      TaskOperations.deleteTask(task.index);
    });

    const editProperty = document.querySelector('#taskList li:last-child span .editDescription');
    editProperty.addEventListener('click', () => {
      TaskOperations.editTask(task.index);
    });
  }

  static updateTasks = () => {
    if (localStorage.getItem('datas')) {
      TaskOperations.tasks = JSON.parse(localStorage.getItem('datas'));
      TaskOperations.tasks.forEach((task) => {
        TaskOperations.renderTasks(task);
      });
    } else {
      TaskOperations.tasks = [];
    }
  }

  static init = () => {
    TaskOperations.loadTasks();
    TaskOperations.renderTasks();
  }

  // static addEventListeners = () => {
  //   const addBtn = document.querySelector('.fa-plus');
  //   const taskList = document.querySelector('#taskList');

  //   addBtn.addEventListener('click', TaskOperations.addTask);
  //   taskList.addEventListener('click', (e) => {
  //     if (e.target.classList.contains('fa-ellipsis-vertical')) {
  //       const index = e.target.parentElement.parentElement.id;
  //       if (e.target.parentElement.parentElement.classList.contains('taskItem')) {
  //         TaskOperations.deleteTask(index);
  //         TaskOperations.renderTasks();
  //       } else if (e.target.parentElement.parentElement.classList.contains('checkbox')) {
  //         if (e.target.parentElement.parentElement.checked) {
  //           TaskOperations.completeTask(index);
  //         } else {
  //           TaskOperations.uncompleteTask(index);
  //         }
  //         TaskOperations.renderTasks();
  //       }
  //     }
  //   });
  // }
}