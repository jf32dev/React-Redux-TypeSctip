import * as React from 'react';
import {
  Button,
  EButtonVariant,
  EButtonSize,
  // useFlyin,
} from '@redbull/components';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { pdf } from '@react-pdf/renderer';
// import { EAppName, EEntityType } from '@redbull/services';
// import html2canvas from 'html2canvas';
// import Jspdf from 'jspdf';
import { ReactComponent as Share } from '@redbull/common/icons/share.svg';
import { ReactComponent as GenInfo } from '@redbull/common/icons/gen-information.svg';
// import { ReactComponent as Tick } from '@redbull/common/icons/tick.svg';
// import { getStoryNavigation } from '../../store/navigation/action';
// import useCreatePdf from '../../hooks/useCreatePdf';
// import { useTypedSelector } from '../../store';
import bridgeServices from '../../api/service';

import styles from './DateActionButton.module.scss';

type Props = {
  // createPdf: () => void;
  // createShare: () => void;
};

type File = {
  [key: string]: any;
};

// const FILE_EXTENTION = 'png';

const DateActionBtns: React.FC<Props> = () => {
  // const dispatch = useDispatch();
  // const { page, channelId, storyId } = useParams() as any;
  // const [isSaveModalOpen, setSaveModalOpen] = React.useState<boolean>(false);
  // const { addFlyin } = useFlyin();
  // const stories = useTypedSelector((state) => state.navigation.stories.nav);
  const [today, setToday] = React.useState('');
  // const openSaveModal = () => {
  //   setSaveModalOpen(true);
  // };
  // console.log(stories);
  // const closeSaveModal = () => {
  //   setSaveModalOpen(false);
  // };
  // const handleSavePdfClick = (title: string, channelId: number) => {
  //   addFlyin('GeneratingPDF');
  //   const createPdf = async (document: any) => {
  //     const blobDocument = await pdf(document).toBlob();
  //     if (!generating) {
  //       console.log('asdf');
  //       generatePdf({
  //         blob: blobDocument,
  //         title: `${title}`,
  //         channelId,
  //       });
  //     }
  //   };
  //   createPdf(document);
  // };
  // const createPdf = () => {
  //   const preview = document.getElementById('preview') as HTMLElement;
  //   html2canvas(preview, {
  //     scrollY: -window.scrollY,
  //     scale: 1,
  //   }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const imgWidth = 210;
  //     const pageHeight = 295;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     const doc = new Jspdf('p', 'mm', 'a4', true);
  //     let position = 0;
  //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       doc.addPage();
  //       doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }
  //     // eslint-disable-next-line
  //     doc.save('download.pdf');
  //   });
  // };

  // const saveStory = () => {
  //   const preview = document.getElementById('preview') as HTMLElement;
  //   html2canvas(preview, {
  //     scrollY: -window.scrollY,
  //     scale: 1,
  //   }).then(function (canvas) {
  //     const urlString = canvas
  //       .toDataURL('image/png')
  //       .replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  //     console.log(urlString);
  //     saveFile(urlString);
  //   });
  //   addFlyin('Calculator Saved to My Channel', {
  //     type: 'success',
  //   });
  // };

  // const saveFile = async (url: any) => {
  //   console.log('as');
  //   const file = await bridgeServices.createFile({
  //     fileData: url,
  //     fileName: 'Shelf-allocation-calc',
  //     fileExt: FILE_EXTENTION,
  //   });
  //   console.log(file);
  //   const story = await bridgeServices.createStory({
  //     channelId: 782178,
  //     title: 'Shelf-allocation-calc',
  //     attachmentURLs: [file.value.tempURL],
  //   });
  //   console.log(story);
  // };

  const createShare = () => {
    bridgeServices.createShare({
      subject: 'Redbull New account',
      files: [],
      message: 'so much great information in one presentation.',
      visual: true,
    });
  };
  // const saveStory = () => {
  //   const createPdf = async () => {
  //     if (!generating) {
  //       addFlyin('GeneratingPdf');
  //       generatePdf({
  //         blob: null,
  //         title: `title`,
  //         channelId: 782178,
  //       });
  //     }
  //   };
  //   createPdf();
  // };
  // const handleOpenChannel = React.useCallback(() => {
  //   bridgeServices.openEntity({
  //     entityName: EEntityType.CHANNEL,
  //     id: channel,
  //   });
  // }, [channel]);
  // React.useEffect(() => {
  //   if (!stories[channelId]) {
  //     dispatch(getStoryNavigation(+channelId));
  //   }
  // }, [channelId, dispatch, stories]);
  // React.useEffect(() => {
  //   // TODO: check this -- on iOS once the story been synched to server
  //   // we'll receive storyId - this will be useful
  //   // for PDF sharing (on web the whole story is received
  //   // - needs to be adjusted in the hook - currently
  //   // returns undefined for web)
  //   if (storyId) {
  //     addFlyin('infoMessages.successfullySaved', {
  //       type: 'success',
  //     });
  //   }
  // }, [addFlyin, storyId]);

  // React.useEffect(() => {
  //   if (pdfError && created && !storyId) {
  //     addFlyin('errorMessages.createdStoryNotFound', {
  //       type: 'warning',
  //       actionText: 'infoMessages.openChannel',
  //       action: handleOpenChannel,
  //       dismissTimeout: 5000,
  //     });
  //   }
  // }, [pdfError, storyId, addFlyin, handleOpenChannel, created]);

  React.useEffect(() => {
    const newDate = new Date().toLocaleDateString('en-US');
    setToday(newDate);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles['today-date']}>
        <div className={styles['gen-icon']}>
          <GenInfo className={styles.genInfo} />
        </div>
        <div className={styles.date}>
          <p>Source: IRI C-STORE 52 WEEK DATA ENDING 01-24-2021</p>
        </div>
      </div>
      <div className={styles['action-btns']}>
        <div className={styles['back-btn']}>
          <Button variant={EButtonVariant.SECONDARY_WHITE}>Back</Button>
        </div>
        <div className={styles['button-actions']}>
          {/* <Button
            className={styles['buttons-group']}
            size={EButtonSize.NORMAL}
            variant={EButtonVariant.SECONDARY_WHITE}
            onClick={createPdf}
          >
            View Presentation
          </Button> */}
          <Button
            className={styles['buttons-group']}
            size={EButtonSize.NORMAL}
            variant={EButtonVariant.SECONDARY}
            onClick={createShare}
          >
            <span className={styles.icon}>
              <Share className={styles['info-icon']} />
            </span>
            Share
          </Button>
          {/* <Button
            className={styles['buttons-group']}
            size={EButtonSize.NORMAL}
            variant={EButtonVariant.PRIMARY}
            onClick={saveStory}
          >
            <span className={styles['tick-icon']}>
              <Tick className={styles.tick} />
            </span>
            Save
          </Button> */}
        </div>
        {/* <SavePdfModal
          closeModal={closeSaveModal}
          isModalOpen={isSaveModalOpen}
          onSave={handleSavePdfClick}
        /> */}
      </div>
    </div>
  );
};

export default DateActionBtns;
