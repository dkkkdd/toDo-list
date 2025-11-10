import { createForm } from './formFactory.js';

export const initConfirmWindow = () => {
  return createForm({
    type: 'confirm',
    submitText: 'Delete',
  });
};
