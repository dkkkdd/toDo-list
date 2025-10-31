export const createProjectForm = () => {
    const projectFormWindow = document.createElement('div');
    projectFormWindow.classList.add('none', 'project-form-window');

    const form = document.createElement('form');
    form.classList.add('project-form');

    const titleInput = document.createElement('input');
    titleInput.id = 'project-title';
    titleInput.type = 'text';
    titleInput.required = true;
    titleInput.minLength = 1;
    titleInput.maxLength = 30;

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Project title:'
    titleLabel.setAttribute('for', 'project-title');

    const validation = document.createElement('p');
    validation.textContent = 'Please fill in the field.';
    validation.classList.add('project-form-validator', 'none');

    const priorityInput = document.createElement('select');
    priorityInput.id = 'project-priority';
    const priority = [
        { value: 'default', text: 'Default' },
        { value: 'important', text: 'Important' }
    ];

    priority.forEach(p => {
        const option = new Option(p.text, p.value);
        priorityInput.add(option);
    })
    
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Project priority:';
    priorityLabel.setAttribute('for', 'project-priority');

    const buttonCont = document.createElement('div');
    buttonCont.classList.add('confirm-btn-container');

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('project-btn', 'btn');
    projectBtn.textContent = 'Add';

    const cancelprojectBtn = document.createElement('button');
    cancelprojectBtn.classList.add('cancel-project-btn', 'btn');
    cancelprojectBtn.textContent = 'Cancel';

    buttonCont.append(projectBtn, cancelprojectBtn);

    form.append(titleLabel, titleInput, validation, priorityLabel, priorityInput, buttonCont);
    projectFormWindow.append(form);
    document.body.append(projectFormWindow);
}