import { projectForm } from '../forms/projectForm.js';
import { taskForm } from '../forms/taskForm.js';
import { comfirmWindow } from '../forms/comfirmWindow.js';

import { switchTheme, chooseColorTheme } from './theme.js';
import { createAside } from './aside.js';
import { createContent } from './content.js';
import { renderProjects } from '../render/projects.js';
import { renderTasks } from '../render/tasks.js';
import { projectStore } from '../stores/projectStore.js';
import { taskStore } from '../stores/taskStore.js';
import { setupProjectFormHandlers } from '../handlers/handleProjectForm.js';
import { setupProjectActionHandlers } from '../handlers/handleProjectActions.js';
import { setupTaskFormHandlers } from '../handlers/handleTaskForm.js';
import { setupTaskActionHandlers } from '../handlers/handleTaskActions.js';
import { setupBurgerMenu } from './burgerMenu.js';
import { setupDragFunction } from '../handlers/handleDrag.js';

// 💡 Главная функция инициализации страницы
export const initialPage = () => {
  switchTheme();
  chooseColorTheme();
  createAside();
  createContent();

  const projectsDiv = document.querySelector('.projects');
  const tasksDiv = document.querySelector('.tasks');
  const content = document.querySelector('.content');

  // === Подписка на проекты ===
  projectStore.subscribe((projects) => {
    renderProjects(projectsDiv, projects);

    const currentId = projectStore.getCurrentProject();
    if (currentId) {
      // когда есть активный проект — показываем задачи
      renderTasks(tasksDiv, taskStore.getFiltered());
      content.classList.remove('none');
    } else {
      // если нет проектов — скрываем контент
      renderTasks(tasksDiv, []);
      content.classList.add('none');
    }
  });

  // === Подписка на задачи ===
  taskStore.subscribe((filteredTasks) => {
    renderTasks(tasksDiv, filteredTasks);
  });

  // === Навешиваем обработчики ===
  setupProjectFormHandlers();
  setupTaskFormHandlers();
  setupProjectActionHandlers();

  setupTaskActionHandlers();

  setupBurgerMenu();

  const textarea = document.querySelector('textarea');

  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto'; // сброс, чтобы корректно пересчитать
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'; // ограничение
  });

  // === Восстанавливаем текущий проект при загрузке ===
  const savedProjects = projectStore.getAll();
  if (savedProjects.length > 0 && !projectStore.getCurrentProject()) {
    projectStore.setCurrentProject(savedProjects[0].id);
  }

  const tasksList = document.querySelector('.tasks');
  setupDragFunction(tasksList, taskStore);

  const projectsList = document.querySelector('.projects');
  setupDragFunction(projectsList, projectStore);

  projectStore.notify(); // отрисовать проекты
  taskStore.notify(); // и задачи
};
