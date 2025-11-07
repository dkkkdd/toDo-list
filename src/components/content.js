export const createContent = () => {
  const content = document.querySelector('.content');
  const projectTitle = document.createElement('div');
  projectTitle.classList.add('project-title-for-task');

  const createNewTaskBtn = document.createElement('button');
  createNewTaskBtn.classList.add('btn', 'create-task-btn');

  const icon = document.createElement('span');
  icon.classList.add('icon-plus');
  const text = document.createTextNode(' New Task');
  createNewTaskBtn.append(icon, text);

  const organizing = document.createElement('div');
  organizing.classList.add('organizing');

  const taskSortLabel = document.createElement('label');
  taskSortLabel.textContent = 'Sort by:';
  taskSortLabel.setAttribute('for', 'task-sorting');

  const taskSorting = document.createElement('select');
  taskSorting.classList.add('sorting');
  taskSorting.id = 'task-sorting';
  const sorting = [
    { value: 'all', text: 'All' },
    { value: 'priority', text: 'Priority' },
    { value: 'date', text: 'Date' },
  ];

  sorting.forEach((s) => {
    const option = new Option(s.text, s.value);
    taskSorting.add(option);
  });

  const taskFilterLabel = document.createElement('label');
  taskFilterLabel.textContent = 'Filter by:';
  taskFilterLabel.setAttribute('for', 'task-filter');

  const taskFilter = document.createElement('select');
  taskFilter.classList.add('filter');
  taskFilter.id = 'task-filter';
  const priority = [
    { value: 'all', text: 'All' },
    { value: 'done', text: 'Done' },
    { value: 'undone', text: 'Undone' },
    { value: 'deadline', text: 'Missed deadline' },
  ];

  priority.forEach((p) => {
    const option = new Option(p.text, p.value);
    taskFilter.add(option);
  });

  const filterContainer = document.createElement('div');
  filterContainer.classList.add('filter-container');
  filterContainer.append(taskFilterLabel, taskFilter);

  const sortingContainer = document.createElement('div');
  sortingContainer.classList.add('sorting-container');
  sortingContainer.append(taskSortLabel, taskSorting);

  organizing.append(filterContainer, sortingContainer);

  const clearAllBtn = document.createElement('button');
  clearAllBtn.classList.add('clear-all-task-btn', 'clear-btn');
  clearAllBtn.textContent = 'Clear all';

  // контейнер для проектов
  const tasksDiv = document.createElement('div');
  tasksDiv.classList.add('tasks');

  // добавляем в aside
  content.append(projectTitle, organizing, createNewTaskBtn, clearAllBtn, tasksDiv);
};
