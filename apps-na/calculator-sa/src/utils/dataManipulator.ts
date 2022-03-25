import { camelCase } from 'lodash';
import { Config } from '../shared/type';

export const textToJson = (str: string, isiOS: boolean) => {
  let cells = [];
  if (isiOS) {
    cells = str
      .split('\\r\\n')
      .filter((item) => !!item)
      .map((el) => el.split(','));
  } else {
    cells = str
      .split('\n')
      .filter((item) => !!item)
      .map((el) => {
        return el.split(',');
      });
  }

  const headings = cells.shift()?.map((heading) => camelCase(heading));

  const json = cells.map((el) => {
    const obj: any = {};
    el.forEach((content, i) => {
      if ((headings as any)[i]) {
        obj[(headings as any)[i].trim()] = content;
      }
    });
    return obj;
  });
  return json;
};

export const mapConfigToField = (
  objectArray: Config[] | null,
  key: string
): Record<string, Exclude<Config, 'name'>> | null => {
  if (objectArray && objectArray.length > 0) {
    return objectArray.reduce((object, current) => {
      if (current[key]) {
        const newObject = { ...current };
        const defaultKey = camelCase(current[key]);
        // eslint-disable-next-line no-param-reassign
        delete newObject[key];
        return { ...object, [defaultKey]: newObject };
      }
      return { ...object };
    }, {});
  }
  return null;
};
