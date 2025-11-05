// handlers/handleTaskForm.js
import { setupFormHandlers } from './setupFormHandlers.js';
import { projectStore } from '../stores/projectStore.js';
import { taskStore } from '../stores/taskStore.js';
import { renderTasks } from '../render/tasks.js';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const setupTaskFormHandlers = () => {
  setupFormHandlers({
    type: 'task',
    formSelector: '.task-form',
    formWindowSelector: '.task-form-window',
    openBtnSelector: '.create-task-btn',
    submitBtnSelector: '.task-btn',
    cancelBtnClass: 'cancel-task-btn',
    fields: {
      title: '#task-title',
      priority: '#task-priority',
      date: '#task-date',
      comment: '#task-comment',
    },
    validatorSelector: '.task-form-validator',
    store: taskStore,
    onCreate: (newTask) => {
      taskStore.add({
        ...newTask,
        projectId: projectStore.getCurrentProject(),
        createdAt: format(new Date(), 'dd MMMM yyyy', { locale: enUS }),
        done: false,
      });
      renderTasks(document.querySelector('.tasks'), taskStore.getFiltered());
    },
    onUpdate: (id) => {
      renderTasks(document.querySelector('.tasks'), taskStore.getFiltered());
    },
  });
};
