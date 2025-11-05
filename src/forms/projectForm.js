import { createForm } from './formFactory.js';

export const projectForm = createForm({
  type: 'project',
  fields: [
    {
      id: 'project-title',
      label: '*Project title:',
      type: 'text',
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    {
      id: 'project-priority',
      label: 'Priority:',
      type: 'select',
      options: [
        { value: 'default', text: 'Default' },
        { value: 'important', text: 'Important' },
      ],
    },
  ],
});
