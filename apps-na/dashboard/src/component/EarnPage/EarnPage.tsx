import * as React from 'react';
import cx from 'classnames';
import { useParams } from 'react-router';
import { Breadcrumbs, ELoaderSize, Loader } from '@redbull/components';
import { Link } from 'react-router-dom';
import envConfig from '../../config';
import { useUCSLink } from '../../hooks/useUCSLink';

import styles from './EarnPage.module.scss';
import { useBreakpointContext } from '../../context/Breakpoint';
import { useTypedSelector } from '../../store';
import PremiseStatus from '../Dashboard/components/PremiseStatus';

type Params = {
  urn?: string;
};

const dashboardUrn = envConfig.ucs.baseUrn + envConfig.ucs.dashboard;

const EarnPage = () => {
  const { urn } = useParams<Params>();

  const [loaded, setLoaded] = React.useState(false);

  const {
    loginUser: { points },
    premise: { selected },
  } = useTypedSelector((state) => state.config);

  /**
   * Show Zunos Dashboard as the default page
   */
  const { src, reset } = useUCSLink({
    btcUrn: urn || dashboardUrn,
    userInterfaceMode: 'integration',
  });

  const { isMobile } = useBreakpointContext();

  React.useEffect(() => {
    setLoaded(false);
    reset();
  }, [urn, reset]);

  const handleFrameLoaded = () => setLoaded(true);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.left}>
          <Breadcrumbs className={styles.breadcrumbs}>
            <Breadcrumbs.Item>
              <Link to="/">Home</Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Link to="/earn">Incentives</Link>
            </Breadcrumbs.Item>
          </Breadcrumbs>
          <h2>Incentives</h2>
          {points && <h3>{points} PTS</h3>}
        </div>
        <PremiseStatus premise={selected} disabled inverted />
      </div>

      {!loaded && (
        <div className={cx(styles.loader, 'loading')}>
          <Loader size={isMobile ? ELoaderSize.MEDIUM : ELoaderSize.LARGE} />
        </div>
      )}

      {src && (
        <div className={styles.frameContainer}>
          <iframe
            className={styles.frame}
            src={src}
            title="zunos"
            onLoad={handleFrameLoaded}
          />
        </div>
      )}
    </div>
  );
};

export default EarnPage;
