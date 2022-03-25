import { EEntityType, File, GetListParams, Story } from '@redbull/services';
import bridgeServices from '../../api/service';
import { AppThunkAction } from '../index';
import {
  StoryActionTypes,
  GET_STORY_LIST_REQUEST,
  GET_STORY_LIST_SUCCESS,
  GET_STORY_LIST_FAIL,
  GET_STORY_BY_ID_REQUEST,
  GET_STORY_BY_ID_SUCCESS,
  GET_STORY_BY_ID_FAIL,
  CLEAR_STORY_LIST,
  CLEAR_STORY,
} from './type';

const MAX_LIMIT = 100;

export const getPopular = (
  fetchLimit: number = 20,
  displayLimit?: number
): AppThunkAction<StoryActionTypes> => async (dispatch, getState) => {
  const moreStory = getState().stories.listStory.hasMore;
  const moreFile = getState().stories.listFile.hasMore;

  if (!moreStory && !moreFile) return;

  const storyOffset = getState().stories.listStory.data.length;
  const fileOffset = getState().stories.listFile.data.length;

  const totalOffset = storyOffset + fileOffset;

  if (fetchLimit > MAX_LIMIT || fetchLimit + totalOffset > MAX_LIMIT) {
    return;
  }

  dispatch({
    type: GET_STORY_LIST_REQUEST,
  });

  const recommendedStory = moreStory
    ? bridgeServices.getRecommendedList<Story[]>({
        entityName: EEntityType.STORY,
        limit: fetchLimit,
        offset: storyOffset,
      })
    : null;

  const recommendedFile = moreFile
    ? bridgeServices.getRecommendedList<File[]>({
        entityName: EEntityType.FILE,
        limit: fetchLimit,
        offset: fileOffset,
      })
    : null;

  const [storyList, fileList] = await Promise.all([
    recommendedStory,
    recommendedFile,
  ]);

  if (storyList?.hasError && fileList?.hasError) {
    const error = `(Get Recommended List) Story: ${storyList.error}, File: ${fileList.error}`;
    dispatch({
      type: GET_STORY_LIST_FAIL,
      payload: error,
    });
    return;
  }

  let file: File[] = [];
  let story: Story[] = [];

  if (storyList?.hasError) {
    const error = `Recommended Stories: ${JSON.stringify(storyList.error)}`;
    dispatch({
      type: GET_STORY_LIST_FAIL,
      payload: error,
    });
  } else if (storyList) {
    story = storyList.value;
  }

  if (fileList?.hasError) {
    const error = `Recommended Files: ${JSON.stringify(fileList.error)}`;
    dispatch({
      type: GET_STORY_LIST_FAIL,
      payload: error,
    });
  } else if (fileList) {
    file = fileList.value;
  }

  const list = [...(story || []), ...(file || [])]
    .sort((a, b) => a.createDate - b.createDate)
    .slice(0, displayLimit);

  const currentList = getState().stories.list;
  const currentFile = getState().stories.listFile.data;
  const currentStory = getState().stories.listStory.data;

  dispatch({
    type: GET_STORY_LIST_SUCCESS,
    payload: {
      listFile: {
        data: [...currentFile, ...(file || [])],
        hasMore: file?.length === fetchLimit,
      },
      listStory: {
        data: [...currentStory, ...(story || [])],
        hasMore: story?.length === fetchLimit,
      },
      data: [...currentList, ...list],
      hasMore: false,
    },
  });
};

export const getStories = (
  params: Pick<GetListParams, Exclude<keyof GetListParams, 'entityName'>>,
  append: boolean = false
): AppThunkAction<StoryActionTypes> => async (dispatch, getState) => {
  const { limit = 20, offset } = params;

  const currentOffset = offset || (append ? getState().stories.list.length : 0);

  if (limit > MAX_LIMIT || limit + currentOffset > MAX_LIMIT) {
    return;
  }

  dispatch({
    type: GET_STORY_LIST_REQUEST,
  });

  const list = await bridgeServices.getList<Story>({
    entityName: EEntityType.STORY,
    limit,
    offset: currentOffset,
    ...params,
  });
  if (list.hasError) {
    dispatch({
      type: GET_STORY_LIST_FAIL,
      payload: JSON.stringify(list.error),
    });
    return;
  }
  const currentList = getState().stories.list;

  dispatch({
    type: GET_STORY_LIST_SUCCESS,
    payload: {
      data: [...(append ? currentList : []), ...list.value],
      hasMore: list.value.length === limit,
    },
  });
};

export const getStoryDetail = (
  storyId: number
): AppThunkAction<StoryActionTypes> => async (dispatch) => {
  dispatch({
    type: GET_STORY_BY_ID_REQUEST,
  });

  const story = await bridgeServices.getEntity<Story>({
    entityName: EEntityType.STORY,
    id: storyId,
  });

  if (story.error) {
    dispatch({
      type: GET_STORY_BY_ID_FAIL,
      payload: story.error,
    });
  }

  dispatch({
    type: GET_STORY_BY_ID_SUCCESS,
    payload: story.value,
  });
};

export const clearStoryList = () => ({
  type: CLEAR_STORY_LIST,
});

export const clearStory = () => ({
  type: CLEAR_STORY,
});
