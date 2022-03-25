import './style.css';
import taskOperations from './taskOperations';


const addBtn = document.querySelector('.fa-plus');

addBtn.addEventListener('click', taskOperations.addTask);
taskOperations.descriptionInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    taskOperations.addTask();
  }
});

taskOperations.updateTasks();

// const tasks = [
  
// ];



// tasks.sort((a, b) => a.index - b.index).forEach((task) => {
//   taskList.innerHTML += `
//     <li id="${task.index}" class="taskItem"><span><input type="checkbox" class="checkbox" ${task.completed ? 'checked' : 'unchecked'}>
//     <span>${task.description}</span></span><span class="fa-solid fa-ellipsis-vertical fa-lg"></span></li> <hr>`;
// });