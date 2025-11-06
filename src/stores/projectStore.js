// Массив проектов. Каждый проект — объект с уникальным id, названием и приоритетом.
// Используется crypto.randomUUID() для генерации уникальных идентификаторов.
const STORAGE_KEY = 'projects-data';

// Загружаем из localStorage
let projects = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { id: crypto.randomUUID(), title: 'Work', priority: 'important' },
];

let currentProjectId = localStorage.getItem('current-project') || projects[0]?.id || null;

// Множество функций-подписчиков, которые будут вызываться при изменении списка проектов.
const subscribers = new Set();

// Текущий фильтр для отображения проектов.
// 'all' — показываем все, иначе фильтруем по приоритету ('default', 'important', etc.).
let currentFilter = 'all';

export const projectStore = {
  /**
   * Возвращает все проекты в виде нового массива (копии).
   *
   * @returns {Array} Копия массива projects.
   */
  getAll() {
    return [...projects];
  },

  saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    localStorage.setItem('current-project', currentProjectId || '');
  },
  changePosition(from, to) {
    const project = projects.splice(from, 1)[0];
    projects.splice(to, 0, project);
    this.saveToStorage();
    this.notify;
  },

  deleteAll() {
    projects.length = 0;
    currentProjectId = null;
    this.saveToStorage();
    this.notify();
  },

  /**
   * Добавляет новый проект в массив projects.
   *
   * @param {Object} project — объект проекта, например {id, title, priority}.
   * После добавления уведомляет всех подписчиков.
   */
  add(project) {
    projects.push(project);
    this.saveToStorage();
    this.notify();
  },

  /**
   * Возвращает проекты с учетом текущего фильтра.
   *
   * @returns {Array} Отфильтрованный массив проектов.
   */
  getFiltered() {
    return currentFilter === 'all'
      ? [...projects] // возвращаем копию всех проектов
      : projects.filter((p) => p.priority === currentFilter); // фильтруем по приоритету
  },

  /**
   * Устанавливает текущий фильтр по приоритету.
   *
   * @param {string} priority — новый фильтр ('all', 'default', 'important', ...)
   * После установки уведомляет подписчиков.
   */
  setFilter(priority) {
    currentFilter = priority;
    this.notify();
  },

  /**
   * Удаляет проект по его ID.
   *
   * @param {string} id — ID проекта, который нужно удалить.
   * Если проект найден, он удаляется из массива и уведомляются подписчики.
   */
  remove(id) {
    // Удаляем проект
    projects = projects.filter((p) => p.id !== id);

    // удаляем связанные задачи
    import('./taskStore.js').then(({ taskStore }) => {
      taskStore.removeByProject(id);
    });

    // Если удалили активный проект — сбрасываем current
    if (currentProjectId === id) {
      currentProjectId = projects[0]?.id || null;
      localStorage.setItem('current-project', currentProjectId);
    }

    this.saveToStorage();
    this.notify();
  },

  /**
   * Обновляет существующий проект.
   *
   * @param {string} id — ID проекта для обновления.
   * @param {Object} data — объект с новыми значениями полей, например {title, priority}.
   * После обновления уведомляет подписчиков.
   */
  update(id, data) {
    const project = projects.find((p) => p.id === id);
    if (project) {
      Object.assign(project, data); // обновляем свойства проекта
      this.saveToStorage();
      this.notify();
    }
  },

  setCurrentProject(id) {
    currentProjectId = id;
    localStorage.setItem('current-project', id || '');
    this.notify(); // уведомим подписчиков (например, чтобы перерендерить задачи)
  },

  getCurrentProject() {
    return currentProjectId;
  },

  /**
   * Добавляет нового подписчика на изменения списка проектов.
   *
   * @param {Function} callback — функция, которая принимает отфильтрованный список проектов.
   * @returns {Function} Функция для отписки от обновлений.
   */
  subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },

  /**
   * Уведомляет всех подписчиков о текущем состоянии проектов.
   * Использует getFiltered(), чтобы подписчики получали данные с учетом фильтра.
   */
  notify() {
    subscribers.forEach((fn) => fn(this.getFiltered()));
  },
};
