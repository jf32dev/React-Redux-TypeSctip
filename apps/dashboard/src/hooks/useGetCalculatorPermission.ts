import React from 'react';
import { EEntityType } from '@redbull/services';
import envConfig from '../config';
import bridgeServices from '../api/service';

const useGetCalculatorPermission = () => {
  const [hasPermission, setPermission] = React.useState<boolean>(false);

  const getPermission = React.useCallback(async () => {
    const calculatorStory = await bridgeServices.getEntity({
      entityName: EEntityType.STORY,
      id: +envConfig.calculator.app,
    });
    if (!calculatorStory.hasError) {
      setPermission(true);
    }
  }, []);

  React.useEffect(() => {
    getPermission();
  }, [getPermission]);

  return hasPermission;
};

export default useGetCalculatorPermission;
