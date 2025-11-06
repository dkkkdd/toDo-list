import { projectStore } from './projectStore.js';

const STORAGE_KEY = 'tasks-data';
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const formatted = tomorrow.toISOString().split('T')[0];

// Делаем let, потому что tasks будет меняться
let tasks = [
  {
    projectId: projectStore.getCurrentProject(),
    id: crypto.randomUUID(),
    title: 'Prepare the workplace',
    priority: 'default',
    done: false,
    date: formatted,
    comment: 'buy pens',
  },
];

// 🔹 Загружаем из localStorage при старте
const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      // фильтруем только валидные задачи
      tasks = parsed.filter((t) => t && typeof t === 'object' && 'id' in t && 'title' in t);
    }
  } catch (e) {
    console.error('Ошибка чтения localStorage:', e);
    tasks = [];
  }
}

const subscribers = new Set();
let currentFilter = 'all';

export const taskStore = {
  getAll() {
    return [...tasks];
  },

  saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  deleteAll() {
    tasks.length = 0;
    this.saveToStorage();
    this.notify();
  },

  changePosition(from, to) {
    const task = tasks.splice(from, 1)[0];
    tasks.splice(to, 0, task);
    this.saveToStorage();
    this.notify;
  },

  removeByProject(projectId) {
    let changed = false;
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].projectId === projectId) {
        tasks.splice(i, 1);
        changed = true;
      }
    }
    if (changed) {
      this.saveToStorage();
      this.notify();
    }
  },

  add(task) {
    tasks.push(task);
    this.saveToStorage();
    this.notify();
  },

  getFiltered() {
    const currentProjectId = projectStore.getCurrentProject();
    if (!currentProjectId) return [];

    let filtered = tasks.filter((t) => t.projectId === currentProjectId);

    switch (currentFilter) {
      case 'all':
        return filtered;
      case 'done':
        return filtered.filter((t) => t.done);
      case 'undone':
        return filtered.filter((t) => !t.done);
      case 'priority':
        return [...filtered].sort((a, b) => {
          const order = { urgent: 3, high: 2, default: 1 };
          return order[b.priority] - order[a.priority];
        });
      case 'date':
        return [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return filtered;
    }
  },

  setFilter(filter) {
    currentFilter = filter;
    this.notify();
  },

  remove(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.saveToStorage();
      this.notify();
    }
  },

  update(id, data) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      Object.assign(task, data);
      this.saveToStorage();
      this.notify();
    }
  },

  subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },

  notify() {
    subscribers.forEach((fn) => fn(this.getFiltered()));
  },
};

taskStore.notify();
