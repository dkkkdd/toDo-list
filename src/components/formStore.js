const state = {
  isEditMode: false,
  projectToEdit: null,
};

const subscribers = new Set();

export const formStore = {
  getState() {
    return { ...state };
  },

  setEditMode(id = null) {
    state.isEditMode = !!id;
    state.projectToEdit = id;
    this.notify();
  },

  reset() {
    state.isEditMode = false;
    state.projectToEdit = null;
    this.notify();
  },

  subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },

  notify() {
    subscribers.forEach(fn => fn(this.getState()));
  }
};
