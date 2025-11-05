import { formStore } from '../stores/formStore';

/**
 * Универсальная фабрика форм
 * Создаёт форму любого типа: project, task, user и т.д.
 *
 * @param {Object} config
 * @param {string} config.type - уникальный тип формы ("project" | "task" | ...)
 * @param {Array} config.fields - массив полей формы
 * @param {string} [config.submitText="Save"] - текст кнопки отправки
 * @param {string} [config.cancelText="Cancel"] - текст кнопки отмены
 * @param {boolean} [config.appendToBody=true] - сразу добавить в body
 */
export const createForm = ({
  type,
  fields = [],
  submitText = 'Add',
  cancelText = 'Cancel',
  appendToBody = true,
}) => {
  const formWindow = document.createElement('div');
  formWindow.classList.add('none', `${type}-form-window`, 'form-window');

  const form = document.createElement('form');
  form.classList.add(`${type}-form`, 'form');
  form.addEventListener('submit', (e) => e.preventDefault());

  const refs = {}; // сюда сохраним ссылки на все поля

  if (type === 'confirm') {
    const text = document.createElement('p');
    text.textContent = 'Are you sure?';
    form.append(text);
  }

  fields.forEach((field) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('form-field');

    if (field.label) {
      const label = document.createElement('label');
      label.textContent = field.label;
      label.setAttribute('for', field.id);
      wrapper.append(label);
    }

    let input;

    switch (field.type) {
      case 'select':
        input = document.createElement('select');
        field.options?.forEach((opt) => {
          const option = new Option(opt.text, opt.value);
          input.add(option);
        });
        break;

      case 'textarea':
        input = document.createElement('textarea');
        input.rows = field.rows || 3;
        break;

      default:
        input = document.createElement('input');
        input.type = field.type || 'text';
    }

    input.id = field.id;
    input.required = !!field.required;
    if (field.minLength) input.minLength = field.minLength;
    if (field.maxLength) input.maxLength = field.maxLength;
    if (field.min) input.min = field.min;
    if (field.max) input.max = field.max;
    if (field.placeholder) input.placeholder = field.placeholder;
    if (field.value) input.value = field.value;

    const validation = document.createElement('p');
    validation.textContent = field.validationMessage || 'Please fill in the field.';
    validation.classList.add(`${type}-form-validator`, 'none', 'form-validator');

    wrapper.append(input, validation);
    form.append(wrapper);

    refs[field.id] = { input, validation };
  });

  // Кнопки
  const buttonCont = document.createElement('div');
  buttonCont.classList.add('confirm-btn-container');

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.classList.add(`${type}-btn`, 'btn');
  submitBtn.textContent = submitText;

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';

  cancelBtn.classList.add(`cancel-${type}-btn`, 'btn');
  cancelBtn.textContent = cancelText;

  buttonCont.append(submitBtn, cancelBtn);
  form.append(buttonCont);
  formWindow.append(form);

  if (appendToBody) document.body.append(formWindow);
  formStore.reset();

  return { formWindow, form, refs, submitBtn, cancelBtn };
};
