import { Group } from '@redbull/services';
import { RedBullPremise } from './type';

/**
 * Due to the current requirement that a user must be either
 * assigned to group ONP or OFP, or both. And the fact that
 * there won't be multiple group called the same name.
 *
 * So compare length === 2 or 1 is good enough for now.
 * * Later, we may want to discuss if we would like to use group id instead of title
 */
export const getUserPremise = (
  groups: readonly Group[]
): RedBullPremise | 'both' | 'none' => {
  const premise = groups.filter(
    (group) => group.title === 'ONP' || group.title === 'OFP'
  );

  if (premise.length === 2) {
    return 'both';
  }

  if (premise.length === 1) {
    return premise[0].title as RedBullPremise;
  }

  return 'none';
};
