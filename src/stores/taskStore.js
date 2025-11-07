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
let currentSort = null;

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
    const currentProjectId = projectStore.getCurrentProject();
    if (!currentProjectId) return;

    const projectTasks = tasks.filter((t) => t.projectId === currentProjectId);
    const [moved] = projectTasks.splice(from, 1);
    projectTasks.splice(to, 0, moved);

    let i = 0;
    tasks = tasks.map((t) => (t.projectId === currentProjectId ? projectTasks[i++] : t));

    this.saveToStorage();
    this.notify();
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

    // Сначала фильтруем
    let filtered = tasks.filter((t) => t.projectId === currentProjectId);

    switch (currentFilter) {
      case 'done':
        filtered = filtered.filter((t) => t.done);
        break;
      case 'undone':
        filtered = filtered.filter((t) => !t.done);
        break;
      case 'deadline':
        filtered = filtered.filter((t) => new Date(t.date) < new Date());
        break;
      default:
        break;
    }

    // Потом сортируем
    if (currentSort) {
      filtered = [...filtered]; // копия чтобы не мутировать
      if (currentSort === 'priority') {
        const order = { urgent: 3, high: 2, default: 1 };
        filtered.sort((a, b) => order[b.priority] - order[a.priority]);
      } else if (currentSort === 'date') {
        filtered.sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : null;
          const dateB = b.date ? new Date(b.date) : null;

          // Если обе даты отсутствуют порядок не меняетс
          if (!dateA && !dateB) return 0;

          // Если у A нет даты онв идёт после B
          if (!dateA) return 1;

          // Если у B нет даты  она идёт после A
          if (!dateB) return -1;

          // Если обе есть сравниваем как обычно
          return dateA - dateB;
        });
      }
    }

    return filtered;
  },

  setFilter(filter) {
    currentFilter = filter;
    this.notify();
  },
  setSort(sort) {
    currentSort = sort;
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
