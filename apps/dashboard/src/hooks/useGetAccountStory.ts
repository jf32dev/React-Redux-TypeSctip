import * as React from 'react';
import { Channel, EEntityType, Story } from '@redbull/services';
import bridgeServices from '../api/service';

type TReturn = [
  Story | null,
  (channel: Channel) => void,
  boolean,
  string | null
];

const useGetAccountStory = (): TReturn => {
  const [story, setStory] = React.useState<Story | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const getStory = React.useCallback(async (channel: Channel) => {
    setError('');
    setLoading(true);
    const { id, name } = channel;
    const pretty = name.split('(')[0].trim().split(' - ')[0].trim() || null;
    /**
     * HACK: might affect the reporting, but have no choice at this stage
     * Requested getList API to be enhanced but hasnt been done for months.
     */
    const search = await bridgeServices.searchStories({
      q: `${pretty || name}(channel.id:${id})`,
      limit: 1,
    });

    if (search.hasError || !search.value.length) {
      setError(JSON.stringify(search.error));
      setLoading(false);
      return;
    }
    const details = await bridgeServices.getEntity<Story>({
      entityName: EEntityType.STORY,
      id: search.value[0].id,
    });

    if (details.hasError) {
      setError(JSON.stringify(details.error));
      setLoading(false);
      return;
    }
    setStory(details.value);
    setLoading(false);
  }, []);

  return [story, getStory, loading, error];
};

export default useGetAccountStory;
