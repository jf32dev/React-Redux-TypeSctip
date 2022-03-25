import { File } from '@redbull/services';
import * as utils from '../utils';
import { mockAccount } from '../../__mocks__/account';

describe('isType', () => {
  test('returns true if Type is included in File Description', () => {
    const TYPE: string = 'agreements';
    const FILE: File = mockAccount.files[0];
    const isFileCorrectType = utils.isType(TYPE)(FILE);
    expect(isFileCorrectType).toBe(true);
  });
  test('returns false if Type is not included in File Description', () => {
    const TYPE: string = 'planograms';
    const FILE: File = mockAccount.files[0];
    const isFileCorrectType = utils.isType(TYPE)(FILE);
    expect(isFileCorrectType).toBe(false);
  });
});
