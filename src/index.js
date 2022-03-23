import './style.css';

const tasks = [
  {
    index: 0,
    description: 'Learn about Webpack',
    completed: false,
  },
  {
    index: 1,
    description: 'Learn about React',
    completed: false,
  },
  {
    index: 2,
    description: 'Learn about Redux',
    completed: false,
  },
  {
    index: 3,
    description: 'Go to gym',
    completed: true,
  },
];

const taskList = document.querySelector('#taskList');

tasks.sort((a, b) => a.index - b.index).forEach((task) => {
  taskList.innerHTML += `
    <li id="${task.index}" class="taskItem"><span><input type="checkbox" class="checkbox" ${task.completed ? 'checked' : 'unchecked'}>
    <span>${task.description}</span></span><span class="fa-solid fa-ellipsis-vertical fa-lg"></span></li> <hr>`;
});