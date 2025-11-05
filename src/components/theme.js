export const switchTheme = () => {
  const theme = document.querySelector('.theme');
  const sun = document.querySelector('.icon-sun');
  const moon = document.querySelector('.icon-contrast');

  if (!theme || !sun || !moon) return;

  // Загружаем сохранённую тему
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Обновляем иконки при загрузке
  const isDark = document.documentElement.classList.contains('dark');
  sun.classList.toggle('active', !isDark);
  moon.classList.toggle('active', isDark);

  // Переключатель
  theme.addEventListener('click', () => {
    const nowDark = document.documentElement.classList.toggle('dark');

    // Сохраняем выбор
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');

    // Обновляем иконки
    sun.classList.toggle('active', !nowDark);
    moon.classList.toggle('active', nowDark);
  });
};
