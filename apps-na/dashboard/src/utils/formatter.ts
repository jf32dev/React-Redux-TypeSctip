/**
import { filterByName } from './utils';
 * Get the pretty name of a channel
 * Rebull Channel Name is a bit ugly
 * so we will need to take and split up the channel name
 * based on a certain convention that has been agreed with RB
 *
 * The channel name will be in a format:
 * [ChannelName_CountryCode_RegionCode/Name_PremisesType]
 *
 * Channel Name Example:
 * 1. Brand_DE_DE_OFP
 * 2. POS Catalogue_DE_DE_OFP
 * 3. Orlen_DE_DE_OFP
 *
 * The 3rd Channel is an exeception whereby it has no Parent Name as a prefix.
 *
 * @param {string} str string with [ChannelName_CountryCode_RegionCode/Name_PremisesType] format
 * @return {Object} object with name, country, region, premises properties
 */

export const getPrettyName = (str: string) => {
  /**
   * Regex to get channel name in a group on a specific format
   * other than that ignore since it is not a valid name.
   *
   * regex:
   * group1 -- get everything before the _ (underscore)
   * group2 -- get 2 or 3 letters language code
   * group3 -- get Region Name / Code (can be optional)
   * group4 -- get Premises Type
   */
  const regex = /([^_]+)_([A-Z]{2,3})_?(.+)?_(.+)/gi;
  const metadata = regex.exec(str);
  if (metadata) {
    return {
      // utilise parent name if name is not exist after split
      name: metadata[1],
      country: metadata[2],
      region: metadata[3],
      premises: metadata[4],
    };
  }
  return null;
};

/**
 * Regex to get file name in a story on a specific format
 * other than that ignore since it is not a valid name.
 *
 * regex:
 * group1 -- group / filter type - (hypen) until the first hypen
 * group2 -- filename
 *
 * @param {string} filename string with [GroupType-fileName] format
 * @param {string} replace string to be replaced on the filename, default: -
 * @param {string} newStr strint replacement for replace value
 * @return {Object} object with filename and group (optional) properties
 */
export const getFileName = (
  filename: string,
  replace: string = '_',
  newStr: string = ' '
) => {
  const regex = /^([^-]+)-(.*)/gi;
  const metadata = regex.exec(filename);
  if (metadata) {
    return {
      group: metadata[1],
      filename: (metadata[2] || metadata[1])
        .replace(/\.[^/.]+$/, '')
        .split(replace)
        .join(newStr),
    };
  }
  return {
    filename: filename
      .replace(/\.[^/.]+$/, '')
      .split(replace)
      .join(newStr),
  };
};

/**
 * Get string without country name and region name (value in the bracket)
 * @param {string} str string with [Title (CountryName - RegionName)] format
 * @return {string} string value without the name and region name
 */
export const getNameWithoutCountry = (str: string) =>
  str.replace(/\(.+\)/, '').trim();
