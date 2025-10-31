import { comfirmWindow } from "./comfirmWindow";
// создаем боковое меню где будут отображаться наши проекты 
export const createAside = () => {
    const aside = document.querySelector('.aside');
    const confirm = comfirmWindow();

    const createNewProjectBtn = document.createElement('button');
    createNewProjectBtn.classList.add('btn', 'create-btn', 'icon-folder-plus');
    createNewProjectBtn.textContent = ' New Project';

    
    const priorityFilter = document.createElement('select');
    priorityFilter.id = 'project-priority-filter';
    const priority = [
        { value: 'all', text: 'All' },
        { value: 'default', text: 'Only default' },
        { value: 'important', text: 'Only important' }
    ];

    priority.forEach(p => {
        const option = new Option(p.text, p.value);
        priorityFilter.add(option);
    })

    const priorityFilterLabel = document.createElement('label');
    priorityFilterLabel.textContent = 'Filter by priority:';
    priorityFilterLabel.setAttribute('for', 'project-priority-filter');
    


    // сюда они будут добавляться
    const projectsDiv = document.createElement('div');
    projectsDiv.classList.add('projects');

    aside.append(confirm, createNewProjectBtn, priorityFilterLabel, priorityFilter, projectsDiv);
}

// !! ДОБАВИТЬ: ЕСЛИ МАСИВ ПРОЕКТОВ ПУСТЬ ОТОБРАЗИТЬ КАРТИНКУ СООБЩАЮЮЩУУ ОБ ЭТОМ