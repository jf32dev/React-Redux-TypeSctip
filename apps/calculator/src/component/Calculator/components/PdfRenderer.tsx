import React from 'react';
import cx from 'classnames';
import { pdf } from '@react-pdf/renderer';

import { Button, EButtonVariant, useFlyin } from '@redbull/components';
import { EEntityType } from '@redbull/services';

import { ReactComponent as Share } from '@redbull/common/icons/share.svg';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';
import SavePdfModal from './SavePdfModal';

import bridgeServices from '../../../api/service';
import useCreatePdf from '../../../hooks/useCreatePdf';
import { useShare } from '../../../hooks/useShare';
import { ECalculatorType } from '../shared/config';

import styles from './PdfRenderer.module.scss';

type Props = {
  document: any; // TODO: type
  calculator: ECalculatorType;
};

const PdfRenderer = ({ document, calculator }: Props) => {
  const { t } = useTranslation();
  const [isSaveModalOpen, setSaveModalOpen] = React.useState<boolean>(false);
  const [share, , shareError] = useShare();
  const [
    storyId,
    channel,
    generatePdf,
    generating,
    created,
    pdfError,
  ] = useCreatePdf();
  const { addFlyin } = useFlyin();

  const openSaveModal = () => {
    setSaveModalOpen(true);
  };

  const closeSaveModal = () => {
    setSaveModalOpen(false);
  };

  const handleShare = () => {
    if (storyId) {
      share(storyId);
    }
  };

  const handleSavePdfClick = (title: string, channelId: number) => {
    addFlyin(t('infoMessages.generatingPDF'));

    // This can be done using the BlobProvider,
    // however it is very heavy and probably not suitable for this case
    // as it renders multiple time. and will lead to the dereference error
    // https://github.com/diegomura/react-pdf/issues/608
    // thus getting the blob after click is used.

    const createPdf = async () => {
      const blobDocument = await pdf(document).toBlob();
      const calcType = calculator
        .split('-')
        .map((word) => capitalize(word))
        .join(' ');
      if (!generating) {
        generatePdf({
          blob: blobDocument,
          title: `${title} - ${calcType}`,
          channelId,
        });
      }
    };
    createPdf();
  };

  const handleOpenChannel = React.useCallback(() => {
    bridgeServices.openEntity({
      entityName: EEntityType.CHANNEL,
      id: channel,
    });
  }, [channel]);

  React.useEffect(() => {
    // TODO: check this -- on iOS once the story been synched to server
    // we'll receive storyId - this will be useful
    // for PDF sharing (on web the whole story is received
    // - needs to be adjusted in the hook - currently
    // returns undefined for web)
    if (storyId) {
      addFlyin(t('infoMessages.successfullySaved'), {
        type: 'success',
      });
    }
  }, [addFlyin, storyId, t]);

  React.useEffect(() => {
    if (pdfError) {
      addFlyin(pdfError, {
        type: 'danger',
      });
    }
    if (shareError) {
      addFlyin(shareError, {
        type: 'danger',
      });
    }
  }, [addFlyin, pdfError, shareError]);

  React.useEffect(() => {
    if (pdfError && created && !storyId) {
      addFlyin(t('errorMessages.createdStoryNotFound'), {
        type: 'warning',
        actionText: t('infoMessages.openChannel'),
        action: handleOpenChannel,
        dismissTimeout: 5000,
      });
    }
  }, [pdfError, storyId, addFlyin, handleOpenChannel, created, t]);
  return (
    <>
      <div className={styles.actionGroup}>
        {/* It would be cool to have some sort of loader over the button
      to indicate there is something happening in the background rather
      than it just being disabled - not sure if RB has anything like
      that in the design system */}
        <Button
          className={cx(styles.button, styles.share)}
          disabled={!storyId}
          type="button"
          variant={EButtonVariant.SECONDARY}
          onClick={handleShare}
        >
          <span className="icon">
            <Share />
          </span>
          {t('navigation.share')}
        </Button>
        <Button
          className={styles.button}
          type="button"
          variant={EButtonVariant.PRIMARY}
          onClick={openSaveModal}
        >
          {t('navigation.save')}
        </Button>
      </div>

      <SavePdfModal
        closeModal={closeSaveModal}
        isModalOpen={isSaveModalOpen}
        onSave={handleSavePdfClick}
      />
    </>
  );
};

export default PdfRenderer;
