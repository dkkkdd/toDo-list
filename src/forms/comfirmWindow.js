import { createForm } from '../forms/formFactory.js';

export const comfirmWindow = createForm({
  type: 'confirm',
  submitText: 'Delete',
});
