// projects.js
import { projectStore } from '../stores/projectStore.js';

// рендерим(отображаем) проекты на странице
export const renderProjects = (projectsDiv, projects) => {
  const render = (projects) => {
    // очищаем все
    projectsDiv.innerHTML = '';
    const currentProjectId = projectStore.getCurrentProject();

    const empty = document.createElement('div');
    empty.classList.add('none', 'empty-div');
    const icon = document.createElement('span');
    icon.classList.add('icon-clipboard');
    empty.append(icon, document.createTextNode(' No projects yet.'));
    projectsDiv.append(empty);

    if (projects.length === 0) {
      empty.classList.remove('none');
      return;
    } else {
      empty.classList.add('none');
    }
    // проходимся по проектам, создаем картточки для каждого и закидываем в проджект ДИв
    projects.forEach((project) => {
      const card = document.createElement('div');
      card.classList.add(
        'project-card',
        project.priority === 'default' ? 'default-project' : 'important-project'
      );
      card.dataset.id = project.id;

      //  если этот проект активный — добавляем стиль активности
      if (project.id === currentProjectId) {
        card.classList.add('active');
      }

      card.innerHTML = `
        <div class="project-title">${project.title}</div>
        <div class='setting'>
          <span class='priority icon-flag ${project.priority === 'default' ? 'default-flag' : 'important-flag'}'></span>
          <span class='icon-pencil'></span>
          <span class='icon-bin2'></span>
        </div>`;

      projectsDiv.append(card);
    });
  };

  //   подписыввемся на рендер
  projectStore.subscribe(render);

  render(projects);
};
