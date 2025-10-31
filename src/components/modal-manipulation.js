export const modalManipulation  = (modal, event) => {
    // e.target.preventDefault();
    event === 'open' ? modal.classList.remove('none') : modal.classList.add('none'); 
}