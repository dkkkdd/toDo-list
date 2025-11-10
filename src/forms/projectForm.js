import { createForm } from './formFactory.js';

export const initProjectForm = () => {
  const { formWindow, form, refs, submitBtn, cancelBtn } = createForm({
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

  return { formWindow, form, refs, submitBtn, cancelBtn };
};
