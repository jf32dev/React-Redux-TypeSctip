export const getRandomNumber = (min: number = 0, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const findUniqueSet = <T>(list: T[]): Set<T> => new Set<T>(list);

export const findDuplicateSet = <T>(list: T[]): Set<T> =>
  new Set<T>(
    list.reduce(
      (acc, item) =>
        list.filter((name) => name === item).length > 1 ? [...acc, item] : acc,
      [] as T[]
    )
  );
