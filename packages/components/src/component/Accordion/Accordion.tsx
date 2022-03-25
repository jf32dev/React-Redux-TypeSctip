import React, { ReactElement } from 'react';
import cx from 'classnames';
import styles from './Accordion.module.scss';
import AccordionItem from './AccordionItem';
import AccordionContext from './AccordionContext';
import AccordionHeading from './AccordionHeading';

type TAccordionProps = {
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: string[];
  multiExpand?: boolean;
};
const Accordion = ({
  children,
  className,
  defaultExpanded = [],
  multiExpand = false,
}: TAccordionProps) => {
  const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded);

  return (
    <AccordionContext.Provider value={{ expanded, setExpanded, multiExpand }}>
      <div
        className={cx(
          styles.container,
          expanded.length && styles.expanded,
          className
        )}
      >
        {React.Children.map(children, (child) => {
          const { props, type } = child as ReactElement;
          if (React.isValidElement(child) && type === AccordionItem) {
            return React.cloneElement(child, {
              ...props,
              expanded: !!expanded.find((id) => id === props.id),
            });
          }

          return null;
        })}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Heading = AccordionHeading;
export default Accordion;
