// tasks.js
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { projectStore } from '../stores/projectStore';

// рендерим(отображаем) проекты на странице
export const renderTasks = (taskDiv, tasks) => {
  // очищаем все

  if (projectStore.getAll().length !== 0) {
    const projectTitle = document.querySelector('.project-title-for-task');
    projectTitle.textContent = 'Current project: ';
    const projectId = projectStore.getCurrentProject();
    const project = projectStore.getAll().find((p) => p.id === projectId);

    if (!project) {
      projectTitle.textContent = 'No current project selected';
      return; // прерываем выполнение, чтобы не было ошибок
    }

    projectTitle.innerHTML = `Current project: <strong>${project.title}</strong>`;
  } else return;

  taskDiv.innerHTML = '';

  const empty = document.createElement('div');
  empty.classList.add('none', 'empty-div');
  const icon = document.createElement('span');
  icon.classList.add('icon-clipboard');
  empty.append(icon, document.createTextNode(' No tasks yet.'));
  taskDiv.append(empty);

  if (tasks.length === 0) {
    empty.classList.remove('none');
    return;
  } else {
    empty.classList.add('none');
  }
  // проходимся по таскам, создаем картточки для каждого и закидываем в task ДИв
  tasks.forEach((task) => {
    const card = document.createElement('div');
    card.classList.add(
      'task-card',
      task.priority === 'default' ? 'default-task' : 'important-task'
    );
    card.dataset.id = task.id;
    card.dataset.taskId = task.taskId;
    const formattedDate = task.date
      ? format(new Date(task.date), 'dd MMMM yyyy', { locale: enUS })
      : 'No deadline';

    const deadline = new Date(task.date);
    const isOverdue = deadline < new Date();
    card.classList.toggle('overdue', isOverdue);
    card.classList.toggle('done', task.done);

    card.innerHTML = `
      <div class="${task.done ? 'icon-radio-checked' : 'icon-radio-unchecked'}"></div>
       <div class="card-content">
        <div class="main-task-content">
          <div class="task-title">${task.title}</div>
          <div class='setting'>
            <span class='priority ${task.priority === 'default' ? 'icon-star-empty' : task.priority === 'high' ? 'icon-star-half' : 'icon-star-full'}'></span>
            <span class='icon-pencil'></span>
            <span class='icon-bin2'></span>
        </div>
        </div>
        <div class="task-comment">${task.comment}</div>
        <div class="date">
          <span class="icon-calendar"></span> <div class="task-deadline ${isOverdue ? 'overdue' : ''}">${formattedDate}</div>
        </div>
       </div>`;

    taskDiv.append(card);
  });
};
