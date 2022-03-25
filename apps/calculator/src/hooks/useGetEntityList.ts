import * as React from 'react';
import { EEntityType } from '@redbull/services';
import bridgeServices from '../api/service';

const useGetEntityList = (
  entityName: Exclude<
    EEntityType,
    EEntityType.INTEREST_AREA | EEntityType.FILE_COLLECTION
  >,
  parentEntityName?: EEntityType,
  peid?: number
) => {
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any[] | null>(null);

  const getData = React.useCallback(async () => {
    setLoading(true);

    const list = await bridgeServices.getList({
      entityName,
      parentEntityName,
      peid,
    });

    if (list?.error) {
      setError(JSON.stringify(list.error));
    }

    if (list?.value) {
      setData(list.value);
    }

    setLoading(false);
  }, [entityName, parentEntityName, peid]);

  React.useEffect(() => {
    entityName && getData();
  }, [entityName, getData]);

  return [data, loading, error] as [any[], boolean, string];
};

export default useGetEntityList;
