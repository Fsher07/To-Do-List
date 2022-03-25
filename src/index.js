import './style.css';
import taskOperations from './taskOperations.js';

const addBtn = document.querySelector('.fa-plus');

addBtn.addEventListener('click', taskOperations.addTask);
taskOperations.descriptionInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    taskOperations.addTask();
  }
});

taskOperations.updateTasks();