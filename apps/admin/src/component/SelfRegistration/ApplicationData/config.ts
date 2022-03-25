import { EApplicationFilter } from '../../../api/services/application/type';

export const statusOptions = [
  {
    label: 'Approved',
    value: EApplicationFilter.APPROVED,
  },
  {
    label: 'Denied',
    value: EApplicationFilter.DENIED,
  },
  {
    label: 'Pending',
    value: EApplicationFilter.PENDING,
  },
];
