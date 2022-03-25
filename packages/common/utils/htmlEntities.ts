import { AllHtmlEntities } from 'html-entities';

export const decode = (val?: string, textOnly: boolean = false) => {
  let string = val || '';
  if (string && string.length > 3) {
    // NOTE:
    // &amp; will be decoded as &amp;amp;
    // &thorn; will be decoded as &amp;thorn;
    // we have to run this once to translate it to the correct format.
    // otherwise &amp;amp; will be translated only into &amp;
    string = string.replace(/&amp;/gi, '&');

    string = AllHtmlEntities.decode(string);
    if (textOnly) {
      const htmlRegex = new RegExp(/(<([^>]+)>)/, 'gi');
      string = string.replace(htmlRegex, '');
    }
  }
  return string;
};

export const encode = (val: string) => {
  let string = val;
  if (val.length > 3) {
    string = AllHtmlEntities.encodeNonUTF(val);
  }
  return string;
};
