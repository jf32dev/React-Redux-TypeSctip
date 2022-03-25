// arrow size + small extra padding
const ARROW_SIZE = 10;

export const calculateVerticalPosition = (
  position: 'left' | 'bottom' | 'right' | 'top',
  container: DOMRect,
  tooltip: DOMRect
) => {
  switch (position) {
    case 'top':
      return container.top - tooltip.height - ARROW_SIZE;
    case 'bottom':
      return container.top + container.height + ARROW_SIZE;
    case 'left':
    case 'right':
      return container.top + container.height / 2 - tooltip.height / 2;
    default:
      return 0;
  }
};

export const calculateHorizontalPosition = (
  position: 'left' | 'bottom' | 'right' | 'top',
  container: DOMRect,
  tooltip: DOMRect
) => {
  switch (position) {
    case 'top':
    case 'bottom':
      // container left position + half of its width - half size of tooltip
      return container.left + container.width / 2 - tooltip.width / 2;
    case 'left':
      return container.left - tooltip.width - ARROW_SIZE;
    case 'right':
      return container.left + container.width + ARROW_SIZE;
    default:
      return 0;
  }
};
