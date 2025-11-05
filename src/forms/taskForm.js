import { createForm } from './formFactory';
export const taskForm = createForm({
  type: 'task',
  fields: [
    { id: 'task-title', label: '*Task title:', type: 'text', required: true },
    {
      id: 'task-priority',
      label: 'Priority:',
      type: 'select',
      required: true,
      minLength: 1,
      maxLength: 50,

      options: [
        { value: 'default', text: 'Default' },
        { value: 'high', text: 'High' },
        { value: 'urgent', text: 'Urgent' },
      ],
    },
    {
      id: 'task-date',
      label: 'Deadline:',
      type: 'date',
      min: new Date().toISOString().split('T')[0],
      max: '2036-01-01',
    },
    { id: 'task-comment', label: 'Comment:', type: 'textarea', rows: 2 },
  ],
});
