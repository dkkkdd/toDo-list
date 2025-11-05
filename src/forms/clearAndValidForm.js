// функция очистки формы принимает инпут заголовка который нужно очистить и валидатора чтобы сбросить цвет рамки до базового цвета
// и убрать спан с ошибкой
export const clearForm = (form) => {
  if (!form) return;

  // Очищаем все поля
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    if (input.type === 'select-one') {
      input.value = 'default';
    } else if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked = false;
    } else {
      input.value = '';
    }

    // сбрасываем цвет рамки
    input.style.borderColor = 'var(--sub-theme-color)';
  });

  // Скрываем все сообщения валидации
  const validators = form.querySelectorAll('.form-validator');
  validators.forEach((v) => v.classList.add('none'));
};

// функция для валидации формы, проверяет ввел ли пользователь тайтл проекта,
// если нет форма окрашивается в красный цвет, если да  => конец функции

export const projectFormValidation = (title, validator) => {
  if (title.value.length === 0) {
    validator.classList.remove('none');
    title.style.borderColor = 'var(--error-color)';
    return false;
  } else {
    return true;
  }
};
