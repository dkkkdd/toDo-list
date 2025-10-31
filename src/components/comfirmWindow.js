export const comfirmWindow = () => {
    const window = document.createElement('div');
    window.classList.add('confirm-widow', 'none');

    const card = document.createElement('div');
    card.classList.add('confirm-card');

    const text = document.createElement('p');
    text.textContent = 'Are you sure?'


    const buttonCont = document.createElement('div');
    buttonCont.classList.add('confirm-btn-container');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'delete-project-btn');
    deleteButton.textContent = 'Delete';

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-dalete-project-btn', 'btn');
    cancelButton.textContent = 'Cancel';

    buttonCont.append(deleteButton, cancelButton);

    card.append(text, buttonCont);
    window.append(card);

    return window

}