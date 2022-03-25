import { EEntityType, Story } from '@redbull/services';
import { AppThunkAction } from '..';
import bridgeServices from '../../api/service';
import envConfig from '../../config';
import {
  FileActionTypes,
  GET_THUMBNAIL_LIST_REQUEST,
  GET_THUMBNAIL_LIST_SUCCESS,
  GET_THUMBNAIL_LIST_FAIL,
} from './type';
import { generateLangDict } from './utils';

export const getThumbnailLibrary = (): AppThunkAction<
  FileActionTypes
> => async (dispatch) => {
  dispatch({
    type: GET_THUMBNAIL_LIST_REQUEST,
  });
  const story = await bridgeServices.getEntity<Story>({
    entityName: EEntityType.STORY,
    id: Number(envConfig.thumbnail.library),
  });

  const languageStory = await bridgeServices.getEntity<Story>({
    entityName: EEntityType.STORY,
    id: Number(envConfig.translations.story),
  });

  if (story.hasError || languageStory.hasError) {
    dispatch({
      type: GET_THUMBNAIL_LIST_FAIL,
      payload: `Thumbnails: ${JSON.stringify(
        story.error
      )}, Translations: ${JSON.stringify(languageStory.error)}`,
    });
    return;
  }

  const fileId = languageStory.value?.files && languageStory.value.files[0].id;
  let languageDictionary = {};

  if (fileId) {
    const languageFile = await bridgeServices.readFile({ fileId });
    const items = await JSON.parse(languageFile.value);
    languageDictionary = generateLangDict(items);
  }

  dispatch({
    type: GET_THUMBNAIL_LIST_SUCCESS,
    payload: {
      thumbnails: story.value.files || [],
      languageMap: languageDictionary,
    },
  });
};
