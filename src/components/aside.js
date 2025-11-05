export const createAside = () => {
  const aside = document.querySelector('.aside');
  const createNewProjectBtn = document.createElement('button');
  createNewProjectBtn.classList.add('btn', 'create-btn');

  const icon = document.createElement('span');
  icon.classList.add('icon-folder-plus');
  const text = document.createTextNode(' New Project');
  createNewProjectBtn.append(icon, text);

  const priorityFilter = document.createElement('select');
  priorityFilter.classList.add('filter');
  priorityFilter.id = 'project-priority-filter';
  const priority = [
    { value: 'all', text: 'All' },
    { value: 'default', text: 'Only default' },
    { value: 'important', text: 'Only important' },
  ];

  priority.forEach((p) => {
    const option = new Option(p.text, p.value);
    priorityFilter.add(option);
  });

  const priorityFilterLabel = document.createElement('label');
  priorityFilterLabel.textContent = 'Filter by priority:';
  priorityFilterLabel.setAttribute('for', 'project-priority-filter');

  const filterContainer = document.createElement('div');
  filterContainer.classList.add('filter-container');
  filterContainer.append(priorityFilterLabel, priorityFilter);

  const clearAllBtn = document.createElement('button');
  clearAllBtn.classList.add('clear-all-projects-btn', 'clear-btn');
  clearAllBtn.textContent = 'Clear all';

  // контейнер для проектов
  const projectsDiv = document.createElement('div');
  projectsDiv.classList.add('projects');

  // добавляем в aside
  aside.append(createNewProjectBtn, filterContainer, clearAllBtn, projectsDiv);
};
