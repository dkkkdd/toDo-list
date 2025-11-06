import { projectForm } from '../forms/projectForm.js';
import { taskForm } from '../forms/taskForm.js';
import { switchTheme, chooseColorTheme } from './theme.js';
import { createAside } from './aside.js';
import { createContent } from './content.js';
import { renderProjects } from '../render/projects.js';
import { renderTasks } from '../render/tasks.js';
import { projectStore } from '../stores/projectStore.js';
import { taskStore } from '../stores/taskStore.js';

import { comfirmWindow } from '../forms/comfirmWindow.js';

import { setupProjectFormHandlers } from '../handlers/handleProjectForm.js';
import { setupProjectActionHandlers } from '../handlers/handleProjectActions.js';
import { setupTaskFormHandlers } from '../handlers/handleTaskForm.js';
import { setupTaskActionHandlers } from '../handlers/handleTaskActions.js';
import { setupBurgerMenu } from './burgerMenu.js';
// import { chooseColorTheme } from './theme.js';
import Sortable from 'sortablejs';

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
  //   projectForm();
  // === Навешиваем обработчики ===
  setupProjectFormHandlers();
  setupTaskFormHandlers();
  setupProjectActionHandlers();

  setupTaskActionHandlers();

  setupBurgerMenu();
  //   setupProjectFormHandlers();

  // === При первом запуске ===

  // === Восстанавливаем текущий проект при загрузке ===
  const savedProjects = projectStore.getAll();
  if (savedProjects.length > 0 && !projectStore.getCurrentProject()) {
    projectStore.setCurrentProject(savedProjects[0].id);
  }

  const tasksList = document.querySelector('.tasks');
  new Sortable(tasksList, {
    animation: 200, // плавная анимация

    ghostClass: 'drag-ghost', // класс для "тени" при перетаскивании
    chosenClass: 'drag-chosen', // класс для выбранного элемента
    dragClass: 'dragging', // класс, применяемый во время перетаскивания
    forceFallback: false, // использовать HTML5 dnd или JS fallback
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // кривая плавности
    delay: 0, // задержка перед началом drag (удобно для мобильных)
    delayOnTouchOnly: true, // delay только для тач-устройств

    group: 'shared',
    onEnd: (evt) => {
      taskStore.changePosition(Number(evt.oldIndex) - 1, Number(evt.newIndex) - 1);
    },
  });

  const projectsList = document.querySelector('.projects');
  new Sortable(projectsList, {
    animation: 200, // плавная анимация
    ghostClass: 'drag-ghost', // класс для "тени" при перетаскивании
    chosenClass: 'drag-chosen', // класс для выбранного элемента
    dragClass: 'dragging', // класс, применяемый во время перетаскивания
    forceFallback: false, // использовать HTML5 dnd или JS fallback
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // кривая плавности
    delay: 0, // задержка перед началом drag (удобно для мобильных)
    delayOnTouchOnly: true, // delay только для тач-устройств

    // Разрешает только сортировку внутри контейнера, без перетаскивания в другие
    group: {
      name: 'project',
      pull: false,
      put: false,
    },
    onEnd: (evt) => {
      projectStore.changePosition(Number(evt.oldIndex) - 1, Number(evt.newIndex) - 1);
    },
  });
  projectStore.notify(); // отрисовать проекты
  taskStore.notify(); // и задачи
};
