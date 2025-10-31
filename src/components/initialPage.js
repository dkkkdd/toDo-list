
import { createProjectForm } from "./project-form.js";
import { createAside } from "./aside.js";
import { renderProjects } from "./projects.js";
import { projectStore } from "./projectStore.js";

import { setupProjectFormHandlers } from "../handlers/handleProjectForm.js";
import { setupProjectActionHandlers } from "../handlers/handleProjectActions.js";


// функция инициализации страниці
export const initialPage = () => {
    const content = document.querySelector('.content');

    // создаем боковое меню с проектами
    createAside()

    // создаем форму
    createProjectForm();

//     projectStore.subscribe((projects) => {
//   const projectsDiv = document.querySelector('.projects');
//   renderProjects(projectsDiv, projects);
// });

    const projectsDiv = document.querySelector('.projects');

    // рендерим проекты по дефолту которые видит пользователь впервые открыв страницу
    renderProjects(projectsDiv, projectStore.getFiltered());
    // вешаем слушатели на элементы формы
    setupProjectFormHandlers()
   
// вешаем слушатели на элементы проекта
    setupProjectActionHandlers()
}
