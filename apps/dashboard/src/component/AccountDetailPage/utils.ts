import { File } from '@redbull/services';
import wingtip from '@redbull/common/images/wingtip-logo.png';

import { unslug } from '@redbull/common';
import planograms from '../../images/planograms.png';
import promo from '../../images/promo.png';
import agreements from '../../images/agreements.png';
import presentations from '../../images/presentations.png';

import { getFileName } from '../../utils/formatter';

// cushion to a null value of thumbnails for the account file group.
// this might get removed in the future.
export const getFilterLogo = (str: string) => {
  switch (str) {
    case 'planograms':
      return planograms;
    case 'promo calendar':
      return promo;
    case 'agreements':
      return agreements;
    case 'presentations':
      return presentations;
    default:
      return wingtip;
  }
};

/**
 * Evaluates whether file is of particular type by its
 * description (which is essentialy the file name)
 * @param {string} type agreements / planograms / presentations / promo calendar
 * @param {File} file
 * @returns {boolean}
 */
export const isType = (type: string) => (file: File) =>
  file.description.toLowerCase().includes(type.toLowerCase());

/**
 * Removes file type from its title
 * @param title Usually a file description
 * @param type Usually Agreements / Promo Calendar / Planograms / Presentations
 */
export const removeTypeFromTitle = (title: string, type: string) => {
  const replace = `${type}-`;
  const re = new RegExp(replace, 'i');
  return title.replace(re, '');
};

/**
 * Used for Account Files to unslug File description and remove file type from the title
 * @param fileType Usually Agreements / Promo Calendar / Planograms / Presentations
 */
export const prettifyFileDescription = (fileType: string) => (file: File) => {
  const description = removeTypeFromTitle(
    unslug(file.description, '_'),
    unslug(fileType)
  );

  return {
    ...file,
    description,
  };
};

export const groupNameToLower = (file: File) =>
  getFileName(file.description).group?.toLowerCase() || '';
