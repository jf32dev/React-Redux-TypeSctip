import React from 'react';
import { File } from '@redbull/services';
import { useTypedSelector } from '../store';

type TThumbnailLibrary = [
  (name: string, alias?: string, delimeter?: string) => File | null,
  (name: string, alias?: string, delimeter?: string) => string | null
];

const isThumbnailMatch = (
  name: string,
  alias?: string,
  delimiter: string = ' '
) => (thumbnail: File) => {
  const comparator = (value: string) =>
    value?.split(delimiter).join('-').toLowerCase() ===
    thumbnail.description.toLowerCase();

  if (alias) {
    return comparator(name) || comparator(alias);
  }
  return comparator(name);
};

/**
 * NOTE:
 * this is to satisfy RB Requirements where they want to do this automatically,
 * without the needs to always upload icons for every different country.
 * icons has been uploaded to HS-Config -> wingtips icons -> icon pack
 * and icon needs to be updated in the story.
 *
 * it has a special naming convention to tackle some of the naming and shared icon challenges
 * naming:
 * 1. tile-name : tile can be story / channel
 *                so the name of the icon will be the hypenated lowercase channel / story title
 * 2. tile-name-parents : specific only to specific tile example: consumer activations,
 *                        needs to have this cause it has 2 consumer activations.
 */
const useThumbnailLibrary = (): TThumbnailLibrary => {
  const thumbnailLibrary = useTypedSelector((state) => state.files.thumbnail);
  /**
   * HACK:
   * name is tile name, in our use case to grab thumbnail in LandingPage.tsx,
   * name is equal to tileName-parentName alias is another name for the tile
   */
  const getThumbnailUrl = React.useCallback(
    (name: string, alias?: string, delimiter: string = ' ') => {
      if (thumbnailLibrary.length > 0) {
        const file = thumbnailLibrary.find(
          isThumbnailMatch(name, alias, delimiter)
        );
        return file?.thumbnail || null;
      }
      return null;
    },
    [thumbnailLibrary]
  );

  const getThumbnailFile = React.useCallback(
    (name: string, alias?: string, delimiter: string = ' ') => {
      if (thumbnailLibrary.length > 0) {
        const file = thumbnailLibrary.find(
          isThumbnailMatch(name, alias, delimiter)
        );
        return file || null;
      }
      return null;
    },
    [thumbnailLibrary]
  );

  return [getThumbnailFile, getThumbnailUrl];
};
export default useThumbnailLibrary;
