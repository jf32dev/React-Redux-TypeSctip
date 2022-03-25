import * as React from 'react';
import cx from 'classnames';
import { ReactComponent as Chevron } from '@redbull/common/icons/chevron.svg';

import { EAccordionHeadingColour } from './enum';
import { useAccordionContext } from './AccordionContext';
import AccordionHeading from './AccordionHeading';

import styles from './AccordionItem.module.scss';

export type TAccordionItem = {
  className?: string;
  colour?: EAccordionHeadingColour;
  expanded?: boolean;
  id: string;
  title?: string;
  level?: 1 | 2;
  onClick?: (element: HTMLDivElement) => void;
};

const AccordionItem = ({
  className,
  children,
  colour,
  expanded = false,
  id,
  title,
  level = 1,
  onClick,
}: React.PropsWithChildren<TAccordionItem>) => {
  const {
    expanded: expandedId,
    setExpanded,
    multiExpand,
  } = useAccordionContext();
  const accordion = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const [
    customHeader,
    setCustomHeader,
  ] = React.useState<React.ReactNode | null>(null);
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);
  const [focused, setFocused] = React.useState<boolean>(false);

  const handleExpandAccordion = () => {
    setFocused(true);
    if (expandedId.find((eId) => eId === id)) {
      setExpanded(expandedId.filter((eid) => eid !== id));
    } else {
      setExpanded(multiExpand ? [...expandedId, id] : [id]);
    }
    if (onClick && accordion.current) {
      onClick(accordion.current);
    }
  };

  const handleFocusOut = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const element = accordion.current;
    if (element && !element.contains(target)) {
      setFocused(false);
    }
  };

  React.useEffect(() => {
    if (ref.current && isInitialized) {
      const element = ref.current;
      // get the height no matter what is the actual size
      const actualHeight = element.scrollHeight;
      if (expanded) {
        requestAnimationFrame(() => {
          element.style.height = `${actualHeight}px`;
          setTimeout(
            () =>
              requestAnimationFrame(() => {
                element.style.height = '';
              }),
            200
          );
        });
      } else {
        requestAnimationFrame(() => {
          element.style.height = `${actualHeight}px`;
          requestAnimationFrame(() => {
            element.style.height = '0';
          });
        });
      }
    }
  }, [expanded, isInitialized, ref]);

  React.useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      element.style.height = '0';
      setIsInitialized(true);
    }
  }, [ref]);
  React.useEffect(() => {
    if (children) {
      // if there is a custom header then use it.
      const header = React.Children.toArray(children).filter(
        (child) =>
          React.isValidElement(child) &&
          (child as React.ReactElement).type === AccordionHeading
      )[0];
      setCustomHeader(header);
    }
  }, [children]);

  React.useEffect(() => {
    window.addEventListener('click', handleFocusOut);
    return () => window.removeEventListener('click', handleFocusOut);
  }, []);

  return (
    <section
      ref={accordion}
      aria-expanded={expanded}
      className={cx(
        styles.accordion,
        styles[`level-${level}`],
        expanded && styles.expanded,
        className
      )}
    >
      <div
        className={cx(
          styles.heading,
          colour && styles[colour],
          focused && styles.focused
        )}
        title={title}
        onClick={handleExpandAccordion}
      >
        <Chevron />
        {customHeader || <h3 className={styles.title}>{title}</h3>}
      </div>
      <div
        ref={ref}
        aria-hidden={!expanded}
        className={styles.content}
        onClick={() => setFocused(true)}
      >
        {React.Children.map(children, (child) => {
          const isValid = !React.isValidElement(child);
          const isHeadingComponent =
            (child as React.ReactElement).type === AccordionHeading;

          // if element is not valid and it is a heading component
          // do not display the item in the body.
          if (isValid || isHeadingComponent) {
            return null;
          }
          return child;
        })}
      </div>
    </section>
  );
};

export default AccordionItem;
