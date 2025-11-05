// handlers/handleProjectActions.js
import { projectStore } from '../stores/projectStore.js';
import { taskStore } from '../stores/taskStore.js';
import { modalManipulation } from '../forms/formManipulation.js';
import { formStore } from '../stores/formStore.js';

export const setupTaskActionHandlers = () => {
  const taskFilter = document.querySelector('#task-filter');
  const confirmWindow = document.querySelector('.confirm-form-window');
  const deleteTaskBtn = document.querySelector('.confirm-btn');
  const clearAllBtn = document.querySelector('.clear-all-task-btn');
  const projectFormWindow = document.querySelector('.task-form-window');
  const tasksDiv = document.querySelector('.tasks');
  let taskToDelete = null; // временно хранит id проекта, который нужно удалить
  let deleteMode = null;

  clearAllBtn.addEventListener('click', () => {
    deleteMode = 'all';
    modalManipulation(confirmWindow, 'open');
  });

  //   // Открытие модалки удаления
  tasksDiv.addEventListener('click', (e) => {
    const card = e.target.closest('.task-card');
    if (!card) return;
    taskStore.notify();

    // если нажали на мусорник добываем айди проекта и открываем модальное окно с подтверждением удаления
    if (e.target.classList.contains('icon-bin2')) {
      taskToDelete = card.dataset.id;
      deleteMode = 'single';
      modalManipulation(confirmWindow, 'open');
    }
    if (
      e.target.classList.contains('icon-radio-checked') ||
      e.target.classList.contains('icon-radio-unchecked')
    ) {
      const idCard = card.dataset.id;
      const cardToChange = taskStore.getAll().find((task) => task.id === idCard);
      const newDone = cardToChange.done ? false : true;
      taskStore.update(idCard, { done: newDone });
    }
    // если нажали на иконку изменить, получаем айди проекта и сам проект
    if (e.target.classList.contains('icon-pencil')) {
      const changeId = card.dataset.id;
      const changeTask = taskStore.getAll().find((task) => task.id === changeId);
      if (!changeTask) return;

      //   включаем режим редактирования
      formStore.setEditMode(changeId);
      //   получаем нужные поля и их значения
      const titleInput = document.querySelector('#task-title');
      const prioritySelect = document.querySelector('#task-priority');
      const taskDate = document.querySelector('#task-date');
      const taskComment = document.querySelector('#task-comment');

      const addBtn = document.querySelector('.task-btn');

      //   заполняем форму для редактирования
      titleInput.value = changeTask.title;
      prioritySelect.value = changeTask.priority;
      taskDate.value = changeTask.date;
      taskComment.value = changeTask.comment;
      //   меняем надпись кнопки на сохранить изменения
      addBtn.textContent = 'Save changes';
      //   открываем саму форму
      modalManipulation(projectFormWindow, 'open');
    }
  });
  // Удаление проекта
  deleteTaskBtn.addEventListener('click', () => {
    if (deleteMode === 'single' && taskToDelete) {
      taskStore.remove(taskToDelete);
    } else if (deleteMode === 'all') {
      taskStore.removeByProject(projectStore.getCurrentProject());
    }

    modalManipulation(confirmWindow, 'close');
    taskToDelete = null;
    deleteMode = null; // сброс
  });

  // Фильтрация
  taskFilter.addEventListener('change', () => {
    // фильтр проектов за приоритетом
    taskStore.setFilter(taskFilter.value);
  });
};
