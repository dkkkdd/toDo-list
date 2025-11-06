// handlers/setupFormHandlers.js
import { modalManipulation } from '../forms/formManipulation.js';
import { clearForm, projectFormValidation } from '../forms/clearAndValidForm.js';
import { formStore } from '../stores/formStore.js';
import clickSoundFile from '../sounds/click.mp3';
const clickSound = new Audio(clickSoundFile);

/**
 * Универсальный обработчик для форм (проектов, задач, заметок и т.д.)
 *
 * @param {Object} config - настройки формы
 * @param {string} config.type - тип формы ('project', 'task' и т.д.)
 * @param {string} config.formSelector - селектор формы
 * @param {string} config.formWindowSelector - селектор окна формы
 * @param {string} config.openBtnSelector - селектор кнопки "создать"
 * @param {string} config.submitBtnSelector - селектор кнопки "сохранить"
 * @param {string} config.cancelBtnClass - класс кнопки "отмена"
 * @param {Object} config.fields - объект { имяПоля: селектор }
 * @param {string} config.validatorSelector - селектор валидационного блока
 * @param {Object} config.store - хранилище (projectStore или taskStore)
 * @param {Function} config.onCreate - колбэк при создании
 * @param {Function} config.onUpdate - колбэк при обновлении
 */
export const setupFormHandlers = (config) => {
  const {
    type,
    formSelector,
    formWindowSelector,
    openBtnSelector,
    submitBtnSelector,
    cancelBtnClass,
    fields,
    validatorSelector,
    store,
    onCreate,
    onUpdate,
  } = config;

  const formWindow = document.querySelector(formWindowSelector);
  const openBtn = document.querySelector(openBtnSelector);
  const submitBtn = document.querySelector(submitBtnSelector);
  const validator = document.querySelector(validatorSelector);
  const form = document.querySelector(formSelector);

  // Собираем все поля из `fields`
  const inputs = {};
  for (const [key, selector] of Object.entries(fields)) {
    inputs[key] = document.querySelector(selector);
  }

  // открыть форму
  openBtn.addEventListener('click', () => {
    modalManipulation(formWindow, 'open');
    submitBtn.textContent = 'Add';
    clickSound.currentTime = 0;
    clickSound.play();
  });

  // закрыть форму
  formWindow.addEventListener('click', (e) => {
    const isBackdrop = e.target.classList.contains(formWindowSelector.replace('.', ''));
    const isCancel = e.target.classList.contains(cancelBtnClass);
    if (!isBackdrop && !isCancel) return;

    e.preventDefault();
    clickSound.currentTime = 0;
    clickSound.play();
    modalManipulation(formWindow, 'close');
    clearForm(form);
    formStore.reset();
  });

  // обработка сабмита
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { isEditMode, projectToEdit } = formStore.getState();

    // Валидация только по заголовку
    if (!projectFormValidation(inputs.title, validator)) return;

    // Собираем данные формы в объект
    const data = {};
    for (const [key, input] of Object.entries(inputs)) {
      data[key] = input.value.trim();
    }

    if (isEditMode && projectToEdit) {
      // обновление
      store.update(projectToEdit, data);
      if (onUpdate) onUpdate(projectToEdit, data);
      clickSound.currentTime = 0;
      clickSound.play();
    } else {
      // создание
      const newItem = {
        id: crypto.randomUUID(),
        ...data,
      };
      clickSound.currentTime = 0;
      clickSound.play();
      if (onCreate) onCreate(newItem);
    }

    clearForm(form);
    modalManipulation(formWindow, 'close');

    formStore.reset();
  });
};
