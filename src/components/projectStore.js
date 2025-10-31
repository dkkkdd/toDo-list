// projectStore.js

const projects = [
  { id: crypto.randomUUID(), title: 'New Year', priority: 'default' },
  { id: crypto.randomUUID(), title: 'Work', priority: 'important' },
];

const subscribers = new Set(); // все слушатели
let currentFilter = 'all';

export const projectStore = {
  getAll() {
    return [...projects];
  },

  add(project) {
    projects.push(project);
    this.notify();
  },

  getFiltered() {
    return currentFilter === 'all'
      ? [...projects]
      : projects.filter(p => p.priority === currentFilter);
  },

  setFilter(priority) {
    currentFilter = priority;
    this.notify();
  },

  remove(id) {
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects.splice(index, 1);
      this.notify();
    }
  },


  update(id, data) {
    const project = projects.find(p => p.id === id);
    if (project) {
      Object.assign(project, data);
      this.notify();
    }
  },

  find(id) {
    return projects.find(p => p.id === id);
  },
  
  subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },

  notify() {
    // 🔹 теперь уведомляем только с текущей фильтрацией
    subscribers.forEach(fn => fn(this.getFiltered()));
  },
};
