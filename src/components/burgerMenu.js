import clickSoundFile from '../sounds/click.mp3';
const clickSound = new Audio(clickSoundFile);

export const setupBurgerMenu = () => {
  const burger = document.querySelector('.burger');
  const aside = document.querySelector('.aside');
  const content = document.querySelector('.content');

  if (!burger || !aside) return;

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    clickSound.currentTime = 0;
    clickSound.play();
    burger.classList.toggle('active');
    aside.classList.toggle('open');
  });

  // закрытие при клике в зону контента
  document.addEventListener('click', (e) => {
    // если клик произошёл внутри контента
    if (content.contains(e.target) && !e.target.closest('.form-window')) {
      aside.classList.remove('open');
      burger.classList.remove('active');
    }
  });
};
