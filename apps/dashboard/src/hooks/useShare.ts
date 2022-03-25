import React from 'react';
import { EEntityType, EFileSharingType, Story, File } from '@redbull/services';
import bridgeServices from '../api/service';
import i18n from '../i18n';

type TUseShare = [(storyId: number) => void, boolean, string];

const isShareable = (f: File) =>
  f.sharingType === EFileSharingType.MANDATORY ||
  f.sharingType === EFileSharingType.OPTIONAL;

export const useShare = (): TUseShare => {
  const { t } = i18n;
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
        setError(
          `${t('errorMessages.sharingError')} ${JSON.stringify(story.error)}`
        );
        return;
      }

      const files =
        story.value.files?.filter(isShareable).map((f) => f.id) || [];
      if (files.length > 0) {
        const shared = await bridgeServices.createShare({
          subject: t('infoMessages.newContentShared'),
          files,
        });
        if (shared.hasError) {
          setError(t('errorMessages.noShareableFiles'));
        }
      } else {
        setError(t('errorMessages.noShareableFiles'));
      }
      setLoading(false);
    },
    [t]
  );

  return [share, loading, error];
};
