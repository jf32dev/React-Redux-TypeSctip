import React from 'react';
import { Input } from '@redbull/components';
import { ReactComponent as FilterIcon } from '@redbull/common/icons/filter.svg';
import { useTranslation } from 'react-i18next';

type Props = {
  onFilter: (value: string) => void;
  onFilterReset: () => void;
};

const AccountFilter = ({ onFilter, onFilterReset }: Props) => {
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = React.useState<string>('');

  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFilterValue(e.currentTarget.value);

  const handleFilterResults = () => {
    onFilter(filterValue);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onFilter(filterValue);
    } else if (e.keyCode === 27) {
      handleResetFilter();
    }
  };

  const handleResetFilter = () => {
    setFilterValue('');
    onFilterReset();
  };
  return (
    <div>
      <Input
        data-test="input-component"
        icon={<FilterIcon />}
        placeholder={t('utils.filterResults')}
        resetActive={filterValue.length > 0}
        value={filterValue}
        useIcon
        onChange={handleFilterChange}
        onIconClick={handleFilterResults}
        onInput={handleFilterChange}
        onKeyUp={handleKeyUp}
        onResetClick={handleResetFilter}
      />
    </div>
  );
};

export default AccountFilter;
