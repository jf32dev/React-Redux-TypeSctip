import { Channel, File, Story } from '@redbull/services';
import { getNameWithoutCountry } from './formatter';

/**
 * @param {any} entity any entity and by default will take the title from property name.
 */
const getTitle = (entity: any) => {
  let title = entity.name || '';
  switch (entity.type) {
    case 'story':
      title = entity.title;
      break;
    case 'channel':
      title = entity.name;
      break;
    case 'file':
      title = entity.description;
      break;
    default:
      break;
  }
  if (typeof entity === 'string') {
    title = entity;
  }
  return getNameWithoutCountry(title);
};

export const sortAlpha = (reverse: boolean = false) => (a: any, b: any) => {
  const compareA = getTitle(a).toLocaleLowerCase();
  const compareB = getTitle(b).toLocaleLowerCase();
  if (reverse) {
    return compareB.localeCompare(compareA);
  }
  return compareA.localeCompare(compareB);
};

export const sortFixedList = (
  order: string[],
  langMap: { [key: string]: string },
  reverse: boolean = false
) => (a: any, b: any) => {
  const compareA = langMap[getTitle(a).toLowerCase()];
  const compareB = langMap[getTitle(b).toLowerCase()];
  if (reverse) {
    return (
      order.indexOf(compareB?.toLocaleLowerCase()) -
      order.indexOf(compareA?.toLocaleLowerCase())
    );
  }
  return (
    order.indexOf(compareA?.toLowerCase()) -
    order.indexOf(compareB?.toLowerCase())
  );
};

export const sortRecent = (a: Story | File, b: Story | File) =>
  b.createDate - a.createDate;

export const filterByName = (value: string) => (
  item: Story | File | Channel
) => {
  if (item.type === 'file')
    return (item as File).description
      .toLowerCase()
      .includes(value.toLowerCase());
  if (item.type === 'story')
    return (item as Story).title.toLowerCase().includes(value.toLowerCase());
  if (item.type === 'channel')
    return (item as Channel).name.toLowerCase().includes(value.toLowerCase());
  return false;
};
