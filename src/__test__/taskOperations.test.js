import TaskOperations from '../taskOperations.js';

describe('TaskOperations', () => {
  test('should add to localstorage', () => {
    const Task = { index: 1, description: 'test', completed: false };
    TaskOperations.addTask();
    expect(JSON.parse(localStorage.getItem('tasksData'))).toEqual(Task);
  });
});