import * as React from 'react';
import { EEntityType, Story, File } from '@redbull/services';
import { CountryCode, unslug } from '@redbull/common';
import bridgeServices from '../api/service';
import { ECalculatorType } from '../component/Calculator/shared/config';
import calculatorTab from '../constants/calculator';

type TUseGetProductImages = [
  File[],
  string,
  (country: CountryCode, calcType: ECalculatorType) => void
];

const useGetProductImages = (): TUseGetProductImages => {
  const [error, setError] = React.useState<string>('');
  const [images, setImages] = React.useState<File[]>([]);

  const getStoryFiles = React.useCallback(async (id: number) => {
    const story = await bridgeServices.getEntity<Story>({
      entityName: EEntityType.STORY,
      id,
    });

    if (story.error) {
      setError(JSON.stringify(story.error));
      return;
    }

    const files = story.value.files?.filter((f) => f.category === 'image');
    if (files) {
      setImages(files);
    }
  }, []);

  const getCalculatorStory = React.useCallback(
    async (country: CountryCode, calcType: ECalculatorType) => {
      if (country) {
        /**
         * Get all story in the calculator Tab and include its parent.
         * TODO: limit shouldnt be a magic number.
         * TODO: do another loop if calculator is not found within 20 stories.
         */
        const available = await bridgeServices.getList<Story>({
          entityName: EEntityType.STORY,
          parentEntityName: EEntityType.TAB,
          peid: calculatorTab,
          limit: 20,
          includeAttributes: ['channel'],
        });

        if (available.hasError) {
          setError(JSON.stringify(available.error));
          return;
        }

        // find the correct calculator story
        // story name is equal to the calculator type name
        // parent channel is equal to the country name
        const calculatorStory = available.value.find(
          (story) =>
            story.channel &&
            story.channel?.name.toLowerCase() === country.toLowerCase() &&
            story.title.toLowerCase() ===
              unslug(calcType.toString()).toLowerCase()
        );

        if (calculatorStory) {
          getStoryFiles(calculatorStory.id);
        }
      }
    },
    [getStoryFiles]
  );

  return [images, error, getCalculatorStory];
};

export default useGetProductImages;
