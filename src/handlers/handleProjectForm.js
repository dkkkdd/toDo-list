// handlers/handleProjectForm.js
import { projectStore } from "../components/projectStore.js";
import { modalManipulation } from "../components/modal-manipulation.js";
import { clearProjectForm, projectFormValidation } from "../components/clearAndValidForm.js";
import { formStore } from "../components/formStore.js";

export const setupProjectFormHandlers = () => {
    // работа с дом
  const projectFormWindow = document.querySelector('.project-form-window');
  const newProjectBtn = document.querySelector('.create-btn');
  const projectAddBtn = document.querySelector('.project-btn');
  const title = document.querySelector('#project-title');
  const priority = document.querySelector('#project-priority');
  const projectFormValidator = document.querySelector('.project-form-validator');

  //открытие формы
  newProjectBtn.addEventListener('click', () => {
    modalManipulation(projectFormWindow, 'open');
    projectAddBtn.textContent = 'Add';

  });

  // закрытие формы по кнопке и по щелчку мимо самой формы
  projectFormWindow.addEventListener('click', (e) => {
    const isBackdrop = e.target.classList.contains('project-form-window');
    const isCancel = e.target.classList.contains('cancel-project-btn');
    
    if (!isBackdrop && !isCancel) return;

    e.preventDefault();
    // закрывваем форму
    modalManipulation(projectFormWindow, 'close');
    // очищаем форму
    clearProjectForm(title, priority, projectFormValidator);
  });

//   добавление проекта при нажатии кнопки
  projectAddBtn.addEventListener('click', (e) => {
    const { isEditMode, projectToEdit } = formStore.getState();
    e.preventDefault();

    // сначала делаем валидацию, если пользователь все заполнил верно тогда дабавляем проект в список
    if (!projectFormValidation(title, projectFormValidator)) return;
        
  if (isEditMode && projectToEdit) {
    projectStore.update(projectToEdit, {
      title: title.value,
      priority: priority.value
    });
  } else {
    projectStore.add({
      id: crypto.randomUUID(),
      title: title.value,
      priority: priority.value
    });
  }

  formStore.reset();

    //   очщаем форму и закрывваем форму
      clearProjectForm(title, priority, projectFormValidator);
      modalManipulation(projectFormWindow, 'close');
    })
};
