import { useMemo } from 'react';
import { UCContentType, UCSearchResult } from '@redbull/services';

type Params = {
  items: UCSearchResult[];
  select: (UCContentType | UCContentType[])[];
};

/**
 *
 * @param param.item `UCSSearchResult[]` - The array of UCSearchResult
 * @param param.select `string[] | string[][]` - The type of content to be categorised
 *
 * @returns `UCSearchResult[][]` - An array of UCSearchResult array
 *
 * @exmaple1
 * ```
 * const [courses, leaderboards] =
 *  useUCSCategorizer({ items, select: ['course', 'loeaderboard'] })
 * ```
 *
 * @example2
 * ```
 * const [coursesAndPDFs, leaderbards] =
 *  useUCSCategorizer({ items, select: [['course', 'pdf'], 'leaderboard'] })
 * ```
 */
export const useUCSCategorizer = ({ items, select }: Params) => {
  return useMemo(() => {
    return select.reduce<UCSearchResult[][]>((res, types) => {
      res.push(
        items.filter((item) =>
          Array.isArray(types) ? types.includes(item.type) : item.type === types
        )
      );
      return res;
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify({ items, select })]);
};
