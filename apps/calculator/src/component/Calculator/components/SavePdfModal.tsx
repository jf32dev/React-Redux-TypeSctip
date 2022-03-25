import React from 'react';
import cx from 'classnames';
import { ValueType } from 'react-select';

import {
  Button,
  EButtonVariant,
  Modal,
  Input,
  Select,
} from '@redbull/components';

import { EEntityType } from '@redbull/services';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../../store';
import useGetEntityList from '../../../hooks/useGetEntityList';

import styles from './SavePdfModal.module.scss';

type Props = {
  closeModal: () => void;
  isModalOpen: boolean;
  onSave: (pdfTitle: string, pdfLocation: number) => void;
};

const SavePdfModal = ({ closeModal, isModalOpen, onSave }: Props) => {
  const { t } = useTranslation();
  const personalTab = useTypedSelector((state) => state.tabs.personalTab);

  const [channels, channelsLoading, channelsError] = useGetEntityList(
    EEntityType.CHANNEL,
    EEntityType.TAB,
    personalTab || undefined
  );

  const [pdfTitle, setPdfTitle] = React.useState<string>('');
  const [pdfLocation, setPdfLocation] = React.useState<
    ValueType<{
      label: string;
      value: React.ReactText;
    }>
  >({ label: '', value: 0 });

  const handleCloseModal = () => {
    setPdfTitle('');
    closeModal();
  };

  const handleSaveClick = () => {
    onSave(
      pdfTitle,
      (pdfLocation as {
        label: string;
        value: number;
      })?.value
    );
    setPdfTitle('');
    closeModal();
  };

  const handlePdfLocation = (
    value: ValueType<{
      label: string;
      value: React.ReactText;
    }>
  ) => {
    setPdfLocation(value);
  };

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPdfTitle(val);
  };

  const selectOptions =
    channels && channels.map((c: any) => ({ label: c.name, value: c.id }));

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isModalOpen}
      title={t('navigation.save')}
      autoHeight
    >
      <div className={styles['modal-content']}>
        <div className={styles['input-row']}>
          <Input
            label={t('inputs.title')}
            value={pdfTitle}
            required
            onChange={handleTitleInput}
          />
        </div>
        <div className={styles['input-row']}>
          <Select
            error={channelsError}
            errorMessage={t('errorMessages.problemLoadingYourChannels')}
            isLoading={channelsLoading}
            label={t('navigation.saveTo')}
            options={selectOptions}
            required
            onChange={handlePdfLocation}
          />
        </div>

        <div className={cx(styles.buttons, styles.multiple)}>
          <Button
            type="button"
            variant={EButtonVariant.SECONDARY}
            onClick={handleCloseModal}
          >
            {t('navigation.cancel')}
          </Button>
          <Button
            disabled={
              pdfTitle.length < 3 ||
              (pdfLocation as { value: number; label: string }).value === 0
            }
            type="button"
            variant={EButtonVariant.PRIMARY}
            onClick={handleSaveClick}
          >
            {t('navigation.save')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SavePdfModal;
