// передаем мужную модалку(форму) и указываем что с ней делать
export const modalManipulation = (modal, event) => {
  event === 'open' ? modal.classList.remove('none') : modal.classList.add('none');
};
