import React from 'react';
import { EEntityType, EFileSharingType, Story, File } from '@redbull/services';
import bridgeServices from '../api/service';

type TUseShare = [(storyId: number) => void, boolean, string];

const isShareable = (f: File) =>
  f.sharingType === EFileSharingType.MANDATORY ||
  f.sharingType === EFileSharingType.OPTIONAL;

export function useShare(): TUseShare {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const share = React.useCallback(
    async (storyId: number) => {
      setLoading(true);

      const story = await bridgeServices.getEntity<Story>({
        entityName: EEntityType.STORY,
        id: storyId,
      });
      if (story.hasError) {
        setError(`Sharing Error: ${JSON.stringify(story.error)}`);
        return;
      }

      const files =
        story.value.files?.filter(isShareable).map((f) => f.id) || [];
      if (files.length > 0) {
        const shared = await bridgeServices.createShare({
          subject: 'New content has been shared with you',
          files,
          visual: true,
        });
        if (shared.hasError) {
          setError(`Sharing Error: No shareable files`);
        }
      } else {
        setError(`Sharing Error: No shareable files`);
      }
      setLoading(false);
    },
    [setError]
  );

  return [share, loading, error];
}
