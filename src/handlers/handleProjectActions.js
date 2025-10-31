// handlers/handleProjectActions.js
import { projectStore } from "../components/projectStore.js";
import { modalManipulation } from "../components/modal-manipulation.js";
import { formStore } from "../components/formStore.js";

export const setupProjectActionHandlers = () => {
  const projectsDiv = document.querySelector('.projects');
  const projectFilter = document.querySelector('#project-priority-filter');
  const confirmWindow = document.querySelector('.confirm-widow');
  const deleteProjectBtn = document.querySelector('.delete-project-btn');

  const projectFormWindow = document.querySelector('.project-form-window');

  let projectToDelete = null; // временно хранит id проекта, который нужно удалить


  // Закрытие окна подтверждения
  confirmWindow.addEventListener('click', (e) => {
    const isBackdrop = e.target.classList.contains('confirm-widow');
    const isCancel = e.target.classList.contains('cancel-dalete-project-btn');
    if (!isBackdrop && !isCancel) return;

    modalManipulation(confirmWindow, 'close');
    projectToDelete = null; // сбрасываем
  });

  // Открытие модалки удаления
  projectsDiv.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    // если нажали на мусорник добываем айди проекта и открываем модальное окно с подтверждением удаления
    if (e.target.classList.contains('icon-bin2')) {
      projectToDelete = card.dataset.id; 
      modalManipulation(confirmWindow, 'open');
    }

    if (e.target.classList.contains('icon-star-empty') || e.target.classList.contains('icon-star-full')) {
        const id = card.dataset.id;
        const project = projectStore.getAll().find(project => project.id === id);
        const newPriority = project.priority === 'important' ? 'default' : 'important';
        projectStore.update(id, { priority: newPriority });
    }
// если нажали на иконку изменить, получаем айди проекта и сам проект
    if (e.target.classList.contains('icon-pencil')) {
      const changeId = card.dataset.id; 
      const changeProject = projectStore.getAll().find(project => project.id === changeId);
      if (!changeProject) return

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
    if (projectToDelete) { // если переменной присвоено значение
      projectStore.remove(projectToDelete);
    //   закрываем модалку
      modalManipulation(confirmWindow, 'close');
      projectToDelete = null; // текущий проект для удаления очищаем
    }
  });

  // Фильтрация
  projectFilter.addEventListener('change', () => {
    // фильтр проектов за приоритетом
    projectStore.setFilter(projectFilter.value);
  });
};
