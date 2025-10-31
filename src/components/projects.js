// projects.js
import { projectStore } from './projectStore.js';

export const renderProjects = (projectsDiv, projects) => {
  const render = (projects) => {
    projectsDiv.innerHTML = '';

    projects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add(
        'project-card',
        project.priority === 'default' ? 'default-project' : 'important-project'
      );
      card.dataset.id = project.id;

      card.innerHTML = `
        <div class="project-title">${project.title}</div>
        <div class='project-setting'>
          <span class='priority ${project.priority === 'default' ? 'icon-star-empty' : 'icon-star-full'}'></span>
          <span class='icon-pencil'></span>
          <span class='icon-bin2'></span>
        </div>`;

      projectsDiv.append(card);
    });
  };

  projectStore.subscribe(render);

//   render(projectStore.getAll());
  render(projects);

};
