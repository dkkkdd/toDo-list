import Sortable from 'sortablejs';
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export const setupDragFunction = (block, store) => {
  new Sortable(block, {
    animation: 200, // плавная анимация

    ghostClass: 'drag-ghost', // класс для "тени" при перетаскивании
    chosenClass: 'drag-chosen', // класс для выбранного элемента
    dragClass: 'dragging', // класс, применяемый во время перетаскивания
    forceFallback: isTouch, // на телефоне используем JS fallback
    fallbackClass: 'sortable-fallback', // кастомный класс для клона
    fallbackOnBody: true, // добавляем клон в body
    fallbackTolerance: 5, // чтобы не срабатывало от малейшего движения
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // кривая плавности
    delay: isTouch ? 400 : 0,
    delayOnTouchOnly: true,
    touchStartThreshold: isTouch ? 10 : 0,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',

    // group: 'shared',
    onEnd: (evt) => {
      store.changePosition(Number(evt.oldIndex) - 1, Number(evt.newIndex) - 1);
    },
  });
};
