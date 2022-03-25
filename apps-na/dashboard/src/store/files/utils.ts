interface LangJSON {
  /**
   * Format:
   * [HUB item id]: { [countryCode]: Tab|Channel|Story }
   * Real example:
   * 0a3bce68-7f1d-479f-a695-9a830f9f77a9: {
   *    EN: 'Execute|POS|Permanent Chilled',
   *    ES: 'Ejecuta|Materiales|Exposición en frío'
   * }
   */
  [key: string]: { [key: string]: string };
}

interface LangMap {
  /**
   * Example:
   * {
   *    visibilidad: "Visibility"  // Spanish
   *    visibilité: "Visibility"   // French
   *    ...
   * }
   */
  [key: string]: string;
}

/**
 * Generates language map for all available language translations ({'foreign term': 'english term'})
 * We need to have all languages at once in case the user is member of multiple groups of different
 * countries (DE_OFP, ES_OFP, ZA_OFP) and the content loads in multiple different languages
 * This is to ensure correct icon pairing (that are placed in the HUB and are paired by English title)
 * @param items JSON file with all language translations, comes from Story in the HUB
 * @returns LangMap
 */
export const generateLangDict = (items: LangJSON) => {
  const languageMap: LangMap = {};

  for (const itemId in items) {
    if (items[itemId]) {
      /**
       * languageList is
       * {
       *      EN: Tab|Channel|Story as string;
       *      FR: Tab|Channel|Story as string
       *      DE: Tab|Channel|Story as string
       *      ES: Tab|Channel|Story as string
       *      ...
       * }
       */
      const languageList = items[itemId];

      Object.keys(languageList).forEach((k) => {
        // get English item Title ('Glossary')
        const englishTitle = languageList.EN.split('|').pop() || '';

        // get item Title in all other languages ('Glossaire', ...)
        if (k !== 'EN') {
          const foreignTitle: string =
            languageList[k].toLowerCase().split('|').pop() || '';

          // create record for item Title in each language with English translation
          languageMap[foreignTitle] = englishTitle;
        }
      });
    }
  }
  return languageMap;
};
