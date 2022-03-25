import * as React from 'react';
import { useIsMounted, decode } from '@redbull/common';
import { EEntityType, Story } from '@redbull/services';
import bridgeServices from '../api/service';

type TReturn = [Story[], boolean, () => Promise<void>, string];

const useFeaturedStories = (initialise: boolean = false): TReturn => {
  const [loading, setLoading] = React.useState(false);
  const [stories, setStories] = React.useState<Story[]>([]);
  const [error, setError] = React.useState<string>('');

  const isMounted = useIsMounted();

  const fetch = React.useCallback(async () => {
    isMounted.current && setLoading(true);
    // Get featured stories to ensure the featureImage is present
    const featured = await bridgeServices.getFeaturedList<Story>({
      entityName: EEntityType.STORY,
    });

    // Looks like featured story doesnt work offline.
    // {code: -1009; message: "The internet connection appears to be offline."}
    if (featured.hasError) {
      isMounted.current && setError(JSON.stringify(featured.error));
      isMounted.current && setLoading(false);
      return;
    }

    // In Mobile Platform, excerpt (short message) is always returning an empty string.
    // To get the detail of the featured story we need to get the Entity (full details) of it.
    const storiesWithDetail = await Promise.all(
      featured.value.map(async (item) => {
        const entity = await bridgeServices.getEntity<Story>({
          entityName: EEntityType.STORY,
          id: item.id,
        });
        return {
          ...item,
          title: decode(item.title, true),
          message: decode(entity.value.message, true),
        };
      })
    );
    isMounted.current && setStories(storiesWithDetail);
    isMounted.current && setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (initialise) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [stories, loading, fetch, error];
};

export default useFeaturedStories;
