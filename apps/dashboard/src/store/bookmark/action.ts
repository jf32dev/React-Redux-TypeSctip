import { EEntityType, Story, File, FileCollection } from '@redbull/services';
import { AppThunkAction } from '..';
import bridgeServices from '../../api/service';
import {
  BookmarkActionTypes,
  GET_BOOKMARK_REQUEST,
  GET_BOOKMARK_FAIL,
  GET_BOOKMARK_SUCCESS,
} from './type';

const MAX_LIMIT = 100;

/**
 * Returns collection of bookmarks: STORY and FILE combined into a collection
 * @param {number} fetchLimit how many of EACH will be fetched
 * @param {number} displayLimit how many of combined documents is displayed in the UI
 * @param {boolean} getMore to fetch more of EACH and combine
 */
export const getBookmarkList = (
  fetchLimit: number = 10,
  displayLimit?: number
): AppThunkAction<BookmarkActionTypes> => async (dispatch, getState) => {
  const moreStory = getState().bookmark.story.hasMore;
  const moreFile = getState().bookmark.file.hasMore;

  if (!moreStory && !moreFile) return;

  const storyOffset = getState().bookmark.story.data.length;
  const fileOffset = getState().bookmark.file.data.length;

  const totalOffset = storyOffset + fileOffset;

  if (fetchLimit > MAX_LIMIT || fetchLimit + totalOffset > MAX_LIMIT) {
    return;
  }

  dispatch({
    type: GET_BOOKMARK_REQUEST,
  });

  const storyBookmark = moreStory
    ? bridgeServices.getBookmarkList<Story>({
        entityName: EEntityType.STORY,
        limit: fetchLimit,
        offset: storyOffset,
      })
    : null;

  const fileBookmark = moreFile
    ? bridgeServices.getBookmarkList<FileCollection>({
        entityName: EEntityType.FILE_COLLECTION,
        limit: fetchLimit,
        offset: fileOffset,
      })
    : null;

  const [storyCollection, fileCollection] = await Promise.all([
    storyBookmark,
    fileBookmark,
  ]);

  if (storyCollection?.hasError && fileCollection?.hasError) {
    const error = `Story: ${storyCollection.error}, File: ${fileCollection.error}`;
    dispatch({
      type: GET_BOOKMARK_FAIL,
      payload: error,
    });
    return;
  }

  let file: File[] = [];
  let story: Story[] = [];

  if (storyCollection?.hasError) {
    const error = `Bookmark Story: ${JSON.stringify(storyCollection.error)}`;
    dispatch({
      type: GET_BOOKMARK_FAIL,
      payload: error,
    });
  } else if (storyCollection) {
    story = storyCollection.value;
  }

  if (fileCollection?.hasError) {
    const error = `Bookmark File: ${JSON.stringify(fileCollection.error)}`;
    dispatch({
      type: GET_BOOKMARK_FAIL,
      payload: error,
    });
  } else if (fileCollection) {
    file = fileCollection.value.map((collection) => collection.files[0]);
  }

  // merge story and file,
  // map to appropriate collection type,
  // and sort collection by Create Date.
  const collection = [...(story || []), ...(file || [])]
    .sort((a, b) => a.createDate - b.createDate)
    .slice(0, displayLimit);

  const currentCollection = getState().bookmark.collection;
  const currentFile = getState().bookmark.file.data;
  const currentStory = getState().bookmark.story.data;

  dispatch({
    type: GET_BOOKMARK_SUCCESS,
    payload: {
      file: {
        data: [...currentFile, ...(file || [])],
        hasMore: file?.length === fetchLimit,
      },
      story: {
        data: [...currentStory, ...(story || [])],
        hasMore: story?.length === fetchLimit,
      },
      collection: [...currentCollection, ...collection],
    },
  });
};
