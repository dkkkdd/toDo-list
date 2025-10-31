
// функция очистки формы принимает инпут заголовка который нужно очистить и валидатора чтобы сбросить цвет рамки до базового цвета 
// и убрать спан с ошибкой
export const clearProjectForm = (title, priority, validator) => {
    title.value = '';
    priority.value = 'default';
    title.style.borderColor = '#214228';
    validator.classList.add('none');
}

// функция для валидации формы, проверяет ввел ли пользователь тайтл проекта,
// если нет форма окрашивается в красный цвет, если да  => конец функции

export const projectFormValidation = (title, validator) =>{
    if(title.value.length === 0){
        validator.classList.remove('none');
        title.style.borderColor = 'rgb(141, 56, 56)';
        return false;
    } else{
        return true
    }
}
