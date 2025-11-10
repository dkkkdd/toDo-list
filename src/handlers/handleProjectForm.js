// // handlers/handleProjectForm.js

import { setupFormHandlers } from './setupFormHandlers.js';
import { renderProjects } from '../render/projects.js';
import { renderTasks } from '../render/tasks.js';
import { projectStore } from '../stores/projectStore.js';

export const setupProjectFormHandlers = () => {
  setupFormHandlers({
    formSelector: '.project-form',
    formWindowSelector: '.project-form-window',
    openBtnSelector: '.create-btn',
    submitBtnSelector: '.project-btn',
    cancelBtnClass: 'cancel-project-btn',
    fields: {
      title: '#project-title',
      priority: '#project-priority',
    },
    validatorSelector: '.project-form-validator',
    store: projectStore,
    onCreate: (newProject) => {
      projectStore.add(newProject);
      projectStore.setCurrentProject(newProject.id);
      const projectsDiv = document.querySelector('.projects');
      renderProjects(projectsDiv, projectStore.getFiltered());
      const content = document.querySelector('.content');
      content.classList.remove('none');
      renderTasks(document.querySelector('.tasks'), []);
    },
    onUpdate: () => {
      const projectsDiv = document.querySelector('.projects');
      renderProjects(projectsDiv, projectStore.getFiltered());
    },
  });
};
