import TaskOperations from './taskOperations.js';

const completeCheck = () => {
  const checkBox = document.querySelectorAll('input[type="checkbox"]');
  checkBox.forEach((node) => {
    node.addEventListener('change', () => {
      if (node.checked) {
        TaskOperations.tasks[node.parentNode.parentNode.id].completed = true;
        localStorage.setItem('datas', JSON.stringify(TaskOperations.tasks));
      } else {
        TaskOperations.tasks[node.parentNode.parentNode.id].completed = false;
        localStorage.setItem('datas', JSON.stringify(TaskOperations.tasks));
      }
    });
  });
};

export default completeCheck;