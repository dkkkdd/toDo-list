import Sortable from 'sortablejs';
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export const setupDragFunction = (block, store) => {
  const sortable = new Sortable(block, {
    animation: 200,
    ghostClass: 'drag-ghost',
    chosenClass: 'drag-chosen',
    dragClass: 'dragging',
    forceFallback: isTouch,
    fallbackClass: 'sortable-fallback',
    fallbackTolerance: 5,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    delay: isTouch ? 400 : 0,
    delayOnTouchOnly: true,
    touchStartThreshold: isTouch ? 10 : 0,

    onEnd: (evt) => {
      store.changePosition(evt.oldIndex - 1, evt.newIndex - 1);
      if (block.classList.contains('.drag-enabled')) {
        store.notify();
      }
    },
  });

  if (block.classList.contains('.drag-enabled')) {
    // 🔹 Функция для управления drag
    const updateDragState = () => {
      const canDrag = block.classList.contains('drag-enabled');
      sortable.option('disabled', !canDrag);

      block.querySelectorAll('.task-card').forEach((card) => {
        card.style.cursor = canDrag ? 'grab' : 'not-allowed';
      });
    };

    // 🔹 Отслеживаем изменения в store
    store.subscribe(updateDragState);

    // 🔹 И MutationObserver — чтобы срабатывать при изменении классов блока
    const observer = new MutationObserver(updateDragState);
    observer.observe(block, { attributes: true, attributeFilter: ['class'] });

    // Первичная установка
    updateDragState();
  }
};
