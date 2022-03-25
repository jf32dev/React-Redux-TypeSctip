import * as React from 'react';

const createRootDom = (id: string) => {
  const root = document.createElement('div');
  root.setAttribute('id', id);
  root.dataset.portal = 'true';
  document.body.appendChild(root);
  return root;
};

const usePortal = (rootId: string) => {
  const target = React.useRef<HTMLElement | null>(null);
  const existingRoot = React.useRef(true);

  const getTarget = React.useCallback(() => {
    if (!target.current) {
      // try to recycle/reuse existing dom with the same id
      target.current = document.getElementById(rootId);
      if (!target.current) {
        // if there is none then create a new root dom
        target.current = createRootDom(rootId);
      }
    }
    return target.current;
  }, [rootId]);

  React.useEffect(() => {
    if (target.current?.dataset.portal === 'true') {
      existingRoot.current = false;
    }
    return () => {
      // remove target from DOM.
      // if and only if the target is created for the portal purposes only.
      // if the target is an existing DOM that has other children don't remove it.
      if (target.current && !existingRoot.current) {
        const dom = target.current;
        if (dom.childElementCount <= 0) {
          target.current.remove();
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return getTarget();
};

export default usePortal;
