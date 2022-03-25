import * as React from 'react';
import { ReactComponent as InfoIcon } from '@redbull/common/icons/info.svg';
import { useFlyin } from '../FlyinMessage';

import styles from './FlyinInfo.module.scss';

type Props = {
  description: string;
  title: string;
};

const FlyinInfo = ({ description, title }: Props) => {
  const { addFlyin, removeFlyin } = useFlyin();

  const handleInfoClick = () => {
    addFlyin(description, {
      type: 'description',
      closeIcon: true,
      title,
      id: 'info',
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => () => removeFlyin('info'), []);

  return <InfoIcon className={styles.icon} onClick={handleInfoClick} />;
};

export default FlyinInfo;
