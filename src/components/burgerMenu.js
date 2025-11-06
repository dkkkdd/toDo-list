export const setupBurgerMenu = () => {
  const burger = document.querySelector('.burger');
  const aside = document.querySelector('.aside');

  if (!burger || !aside) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    aside.classList.toggle('open');
  });

  // закрытие при клике вне aside
  document.addEventListener('click', (e) => {
    if (!aside.contains(e.target) && !burger.contains(e.target)) {
      aside.classList.remove('open');
      burger.classList.remove('active');
    }
  });
};
