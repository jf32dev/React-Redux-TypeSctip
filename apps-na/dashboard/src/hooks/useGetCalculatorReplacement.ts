import React from 'react';
import { EEntityType, Story } from '@redbull/services';
import bridgeServices from '../api/service';
import envConfig from '../config';

type TMappingInfo = {
  navigation: 'learn' | 'sell' | 'execute';
  description: string;
};

const useGetCalculatorReplacementFile = () => {
  const [mappingInfo, setMappingInfo] = React.useState<TMappingInfo | null>(
    null
  );

  const getCalculatorReplacementFile = React.useCallback(async () => {
    const story = await bridgeServices.getList<Story>({
      entityName: EEntityType.STORY,
      parentEntityName: EEntityType.TAB,
      includeAttributes: ['files'],
      limit: 1,
      peid: +envConfig.calculatorReplacement.tab,
    });
    if (!story.hasError && story.value.length) {
      const storyResult = story.value[0];
      if (storyResult.files && storyResult.files.length) {
        const mapping = storyResult.files.find(
          (item) => item.description.toLowerCase() === 'mapping'
        );
        if (mapping) {
          const mappingDetail = (await readMapping(mapping.id)) as TMappingInfo;
          setMappingInfo(mappingDetail);
        }
      }
    }
  }, []);

  const readMapping = async (fileId?: number) => {
    if (fileId) {
      try {
        const data = await bridgeServices.readFile({
          fileId,
        });
        if (!data.hasError && data.value) {
          return JSON.parse(data.value);
        }
      } catch (error) {
        return undefined;
      }
    }
    return undefined;
  };

  React.useEffect(() => {
    getCalculatorReplacementFile();
  }, [getCalculatorReplacementFile]);

  return mappingInfo;
};

export default useGetCalculatorReplacementFile;
