import Execute from '../images/execute-banner.jpg';
import Learn from '../images/learn-banner.jpg';
import Sell from '../images/sell-banner.jpg';
import MyFavourites from '../images/myfavourites-banner.jpg';
import MyFiles from '../images/myfiles-banner.jpg';
import Popular from '../images/popular-banner.jpg';
import LatestUpdates from '../images/latestupdates-banner.jpg';

export type TPage =
  | 'execute'
  | 'learn'
  | 'sell'
  | 'my-files'
  | 'my-favourites'
  | 'popular'
  | 'latest-updates';

export const getBannerImages = (title: TPage) => {
  switch (title) {
    case 'execute':
      return Execute;
    case 'learn':
      return Learn;
    case 'sell':
      return Sell;
    case 'my-files':
      return MyFiles;
    case 'my-favourites':
      return MyFavourites;
    case 'popular':
      return Popular;
    case 'latest-updates':
      return LatestUpdates;
    default:
      return null;
  }
};
