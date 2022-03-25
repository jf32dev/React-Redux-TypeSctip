import * as React from 'react';
import moment from 'moment';
import { blobToBase64 } from '@redbull/common';
import { Story, EEntityType, EAppName } from '@redbull/services';
import { PdfData } from '../shared/type';
import { useTypedSelector } from '../store';
import bridgeServices from '../api/service';

const FILE_EXTENTION = 'pdf';
const N_THRESHOLD = 15;
type TCreatePdf = [
  number,
  number,
  (data: PdfData) => void,
  boolean,
  boolean,
  string
];

const useCreatePdf = (): TCreatePdf => {
  const [error, setError] = React.useState<string>('');
  const [created, setCreated] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [clear, setClear] = React.useState<boolean>(false);
  const [storyId, setStoryId] = React.useState<number>(0);
  const [channel, setChannel] = React.useState<number>(0);
  const counter = React.useRef(0);
  const refInterval = React.useRef<NodeJS.Timeout>();

  const appName = useTypedSelector((state) => state.config.appName);
  const isDraftAvailable = [EAppName.ANDROID, EAppName.IOS].includes(
    appName as EAppName
  );

  const savePdf = React.useCallback(
    async (base64: string, name: string, channelId: number) => {
      console.log('asdf');
      setError('');
      setLoading(true);
      const file = await bridgeServices.createFile({
        fileData: base64,
        fileName: name,
        fileExt: FILE_EXTENTION,
      });

      if (file.error) {
        setError(`Create PDF error: ${JSON.stringify(file.error)}`);
      }

      if (file.value) {
        const story = await bridgeServices.createStory({
          channelId,
          title: name,
          attachmentURLs: [file.value.tempURL],
        });
        console.log(story.value.id);
        if (story.error) {
          setError(
            (errorState) =>
              `${errorState} 'Saving PDF error: ${JSON.stringify(story.error)}`
          );
        }

        if (story.value) {
          setChannel(channelId);
          setCreated(true);
          if (!isDraftAvailable) {
            // on web the whole story is returned immediately
            setStoryId(story.value.id);
          } else {
            // iOS only - story is created as a draft story and synch to the server
            // 30 seconds after creation, then we can get list of stories created
            // after the creation date in the channel we saved it to, filter by name
            // and get our story ID so we can share the story from the UI
            // can't use the createdDate, since the createDate is not always available.
            const storyCreatedDate = moment().unix();

            // try check every 4 seconds and stop trying after 15 times (1 mins)
            // need to set error message and display it to the user that it fails
            // and need to open its story to share.
            refInterval.current = setInterval(async () => {
              const storyList = await bridgeServices.getList<Story>({
                entityName: EEntityType.STORY,
                createDateSince: storyCreatedDate,
                parentEntityName: EEntityType.CHANNEL,
                peid: channelId,
                limit: 5,
              });
              if (!storyList.hasError) {
                // get filter all story
                // except the one that has a matching name
                // which indicates that this is the story that we just created.
                const ourStory = storyList.value.filter(
                  (s) => s.title === name
                );

                counter.current += 1;
                if (ourStory[0]) {
                  setStoryId(ourStory[0].id);
                } else {
                  counter.current === N_THRESHOLD && setClear(true);
                }
              } else {
                refInterval &&
                  refInterval.current &&
                  clearInterval(refInterval.current);
                setError(`Fail to find created document`);
              }
            }, 4000);
          }
        }
      }
      setLoading(false);
    },
    [isDraftAvailable]
  );

  const generatePdf = React.useCallback(
    ({ blob, title, channelId }: PdfData) => {
      if (blob && title) {
        blobToBase64(blob)
          .then((res) => {
            savePdf(res as string, title, channelId);
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.warn(e));
      }
    },
    [savePdf]
  );
  React.useEffect(() => {
    if (storyId && refInterval.current) {
      clearInterval(refInterval.current);
    }
  }, [storyId]);

  // TODO: if not find, sent data to flyIn so user can go to the channel to find it.
  React.useEffect(() => {
    if (clear && refInterval.current) {
      clearInterval(refInterval.current);
      setError(`Fail to find created document`);
    }
  }, [clear]);

  React.useEffect(() => {
    return () => {
      if (refInterval.current) {
        clearInterval(refInterval.current);
      }
    };
  }, []);
  return [storyId, channel, generatePdf, loading, created, error];
};

export default useCreatePdf;
