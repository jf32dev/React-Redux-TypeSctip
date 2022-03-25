import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './FlyinContainer.module.scss';
import FlyinMessage from '../component';
import { TFlyinMessage } from '../type';

type TFlyinContainer = {
  list: TFlyinMessage[];
};
const FlyinContainer = ({ list }: TFlyinContainer) => {
  return (
    <TransitionGroup className={styles['flyin-container']} component="div">
      {list.map((item) => (
        <CSSTransition
          key={item.id}
          classNames={{
            enter: styles.flyinEnter,
            enterActive: styles.flyinEnterActive,
            exit: styles.flyinExit,
            exitActive: styles.flyinExitActive,
          }}
          timeout={item.type === 'description' ? 10 : 500}
        >
          <FlyinMessage
            action={item.action}
            actionText={item.actionText}
            closeIcon={item.closeIcon}
            dismissTimeout={item.dismissTimeout}
            id={item.id}
            message={item.message}
            title={item.title}
            type={item.type}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default FlyinContainer;
