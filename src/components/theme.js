import clickSoundFile from '../sounds/click.mp3';
const clickSound = new Audio(clickSoundFile);

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
    clickSound.currentTime = 0;
    clickSound.play();

    // Сохраняем выбор
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');

    // Обновляем иконки
    sun.classList.toggle('active', !nowDark);
    moon.classList.toggle('active', nowDark);
  });
};

export const chooseColorTheme = () => {
  const color = document.querySelector('#color');

  // Загружаем сохранённую тему
  const savedTheme = localStorage.getItem('color');
  document.documentElement.style.setProperty('--sub-theme-color', savedTheme);
  color.value = savedTheme;

  color.addEventListener('change', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    const colorTheme = color.value;
    document.documentElement.style.setProperty('--sub-theme-color', colorTheme);

    localStorage.setItem('color', colorTheme);
  });
};
