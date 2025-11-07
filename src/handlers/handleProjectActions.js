// handlers/handleProjectActions.js
import { projectStore } from '../stores/projectStore.js';
import { taskStore } from '../stores/taskStore.js';
import { renderTasks } from '../render/tasks.js';
import { modalManipulation } from '../forms/formManipulation.js';
import { formStore } from '../stores/formStore.js';

import clickSoundFile from '../sounds/click.mp3';
const clickSound = new Audio(clickSoundFile);
export const setupProjectActionHandlers = () => {
  const projectsDiv = document.querySelector('.projects');
  const projectFilter = document.querySelector('#project-priority-filter');
  const confirmWindow = document.querySelector('.confirm-form-window');
  const deleteProjectBtn = document.querySelector('.confirm-btn');
  const clearAllBtn = document.querySelector('.clear-all-projects-btn');
  const projectFormWindow = document.querySelector('.project-form-window');
  const tasksDiv = document.querySelector('.tasks');
  const content = document.querySelector('.content');

  let projectToDelete = null; // временно хранит id проекта, который нужно удалить
  let deleteMode = null;

  // Закрытие окна подтверждения
  confirmWindow.addEventListener('click', (e) => {
    const isBackdrop = e.target.classList.contains('confirm-form-window');
    const isCancel = e.target.classList.contains('cancel-confirm-btn');
    if (!isBackdrop && !isCancel) return;

    modalManipulation(confirmWindow, 'close');
    projectToDelete = null; // сбрасываем
    deleteMode = null;
  });

  clearAllBtn.addEventListener('click', () => {
    deleteMode = 'all';
    modalManipulation(confirmWindow, 'open');
  });

  // Открытие модалки удаления
  projectsDiv.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    if (e.target.classList.contains('project-card')) {
      const projects = document.querySelectorAll('.project-card');
      projects.forEach((p) => {
        p.classList.remove('active');
      });
      content.classList.remove('none');
      clickSound.currentTime = 0;
      clickSound.play();
      e.target.classList.add('active');

      const id = card.dataset.id;
      projectStore.setCurrentProject(id);

      // 2️⃣ фильтруем задачи для выбранного проекта
      const projectTasks = taskStore.getAll().filter((t) => t.projectId === id);

      // 3️⃣ рендерим их
      renderTasks(tasksDiv, projectTasks);
    }

    // если нажали на мусорник добываем айди проекта и открываем модальное окно с подтверждением удаления
    if (e.target.classList.contains('icon-bin2')) {
      projectToDelete = card.dataset.id;
      deleteMode = 'single';
      modalManipulation(confirmWindow, 'open');
    }

    if (e.target.classList.contains('icon-flag')) {
      const id = card.dataset.id;
      const project = projectStore.getAll().find((project) => project.id === id);
      const newPriority = project.priority === 'important' ? 'default' : 'important';
      projectStore.update(id, { priority: newPriority });
    }
    // если нажали на иконку изменить, получаем айди проекта и сам проект
    if (e.target.classList.contains('icon-pencil')) {
      const changeId = card.dataset.id;
      const changeProject = projectStore.getAll().find((project) => project.id === changeId);
      if (!changeProject) return;

      //   включаем режим редактирования
      formStore.setEditMode(changeId);
      //   получаем нужные поля и их значения
      const titleInput = document.querySelector('#project-title');
      const prioritySelect = document.querySelector('#project-priority');
      const addBtn = document.querySelector('.project-btn');

      //   заполняем форму для редактирования
      titleInput.value = changeProject.title;
      prioritySelect.value = changeProject.priority;
      //   меняем надпись кнопки на сохранить изменения
      addBtn.textContent = 'Save changes';
      //   открываем саму форму
      modalManipulation(projectFormWindow, 'open');
    }
  });

  // Удаление проекта
  deleteProjectBtn.addEventListener('click', () => {
    if (deleteMode === 'single' && projectToDelete) {
      projectStore.remove(projectToDelete);
      taskStore.removeByProject(projectToDelete);
    } else if (deleteMode === 'all') {
      projectStore.deleteAll();
      taskStore.deleteAll();
      content.classList.add('none');
    }

    modalManipulation(confirmWindow, 'close');
    projectToDelete = null;
    deleteMode = null; // сброс
  });

  // Фильтрация
  projectFilter.addEventListener('change', () => {
    // фильтр проектов за приоритетом

    projectStore.setFilter(projectFilter.value);
  });
};
