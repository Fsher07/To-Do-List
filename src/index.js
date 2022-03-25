import './style.css';
import TaskOperations from './taskOperations.js';
import completeCheck from './checkComplete.js';

const addBtn = document.querySelector('.fa-plus');

addBtn.addEventListener('click', TaskOperations.addTask);
TaskOperations.descriptionInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    TaskOperations.addTask();
  }
});

TaskOperations.updateTasks();

completeCheck();