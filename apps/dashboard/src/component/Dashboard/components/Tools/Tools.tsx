import * as React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { useFlyin, Tile } from '@redbull/components';
import { EAppName } from '@redbull/services';

import { ReactComponent as Calculator } from '@redbull/common/icons/calculator.svg';
import { ReactComponent as BookLove } from '@redbull/common/icons/book-love.svg';
import { ReactComponent as LightBulb } from '@redbull/common/icons/light-bulb.svg';
import { ReactComponent as PreBoard } from '@redbull/common/icons/pre-board.svg';
import { ReactComponent as PreSatchel } from '@redbull/common/icons/pre-satchel.svg';
import { ReactComponent as WindowWarning } from '@redbull/common/icons/window-warning.svg';
import { ReactComponent as Products } from '@redbull/common/icons/products.svg';

import { useTranslation } from 'react-i18next';
import { setPreselected } from '../../../../store/navigation/action';
import { useTypedSelector } from '../../../../store';
import envConfig from '../../../../config';

import useCreatePitch from '../../../../hooks/useCreatePitch';
import useGetCalculatorPermission from '../../../../hooks/useGetCalculatorPermission';
import useGetCalculatorReplacementFile from '../../../../hooks/useGetCalculatorReplacement';
import useOpenStory from '../../../../hooks/useOpenStory';

import styles from './Tools.module.scss';

const Tools = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appName = useTypedSelector((state) => state.config.appName);

  const hasCalculatorPermission = useGetCalculatorPermission();
  const calculatorReplacementFile = useGetCalculatorReplacementFile();

  const [openStory, error, resetError] = useOpenStory();
  const [createPitch, pitchError] = useCreatePitch();

  const { addFlyin } = useFlyin();

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget.parentElement;
    if (target) {
      const { navigation, title } = target.dataset;
      // if it is valid navigation, then route.
      // TODO: if it is not valid navigation then give a flyin message
      if (navigation && title && navigation in envConfig.navigation) {
        dispatch(setPreselected(title));
        dispatch(push(`/${navigation}`));
      }
    }
  };

  const renderCalculatorButton = () => {
    if (hasCalculatorPermission) {
      return (
        <Tile
          icon={<Calculator />}
          title={t('dashboard.tools.calculator')}
          type="button"
          onClick={() => openStory(+envConfig.calculator.app)}
        />
      );
    }
    if (calculatorReplacementFile) {
      const { navigation, description } = calculatorReplacementFile;
      return (
        <Tile
          data-navigation={navigation}
          data-title={description}
          icon={<Products />}
          title="PRODUCTS"
          type="button"
          onClick={handleNavigate}
        />
      );
    }
    return (
      <Tile
        icon={<Calculator />}
        note={t('utils.comingSoon')}
        title={t('dashboard.tools.calculator')}
        type="button"
        disabled
        onClick={() => openStory(+envConfig.calculator.app)}
      />
    );
  };

  React.useEffect(() => {
    if (error) {
      addFlyin(t('errorMessages.calculator'), {
        id: 'calculatorError',
        type: 'danger',
      });
      resetError();
    }
    if (pitchError) {
      // TODO: we might need to do the same like calculator (reset error)
      // for pitch error
      addFlyin(t('errorMessages.pitchBuilder'), {
        type: 'danger',
      });
    }
  }, [addFlyin, error, pitchError, resetError, t]);

  return (
    <div className={styles.container}>
      {renderCalculatorButton()}
      <Tile
        disabled={appName !== EAppName.IOS}
        icon={<PreBoard />}
        title={t('dashboard.tools.pitchBuilder')}
        type="button"
        onClick={() => createPitch()}
      />
      <Tile
        data-navigation="sell"
        data-title="insights"
        icon={<LightBulb />}
        title={t('dashboard.tools.insights')}
        type="button"
        onClick={handleNavigate}
      />
      <Tile
        data-navigation="execute"
        data-title="POS Catalogue"
        icon={<BookLove />}
        title={t('dashboard.tools.posCatalogue')}
        type="button"
        onClick={handleNavigate}
      />
      <Tile
        icon={<PreSatchel />}
        linkTo={`/execute/accounts/${envConfig.navigation.account}`}
        title={t('dashboard.tools.accounts')}
        type="navigation"
        onClick={handleNavigate}
      />
      <Tile
        data-navigation="sell"
        data-title="Objection Handling"
        icon={<WindowWarning />}
        title={t('dashboard.tools.objectionHandling')}
        type="button"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default Tools;
