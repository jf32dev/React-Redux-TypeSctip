import {
  UCContentType,
  UCOptionsInclude,
  UCSortDirection,
  UCSortField,
  UCTarget,
  UCThumbnailSizeHint,
} from './type';

interface UCSearchPaging {
  from?: number;
  limit?: number;
}

interface UCSearchSort {
  sortField?: UCSortField;
  sortDirection?: UCSortDirection;
}

interface UCSearchFilter {
  types?: UCContentType[];
  modifiedWithinDays?: number;
  fields?: {
    field: string;
    value: string;
  }[];
}

interface UCSearchOptions {
  include?: UCOptionsInclude[];
  thumbnailSizeHint?: UCThumbnailSizeHint;
}

export interface UCSearchParams {
  query: string;
  target: UCTarget;
  paging?: UCSearchPaging;
  sort?: UCSearchSort;
  filter?: UCSearchFilter;
  options?: UCSearchOptions;
}

export interface UCLinkParams {
  btcUrn: string;
  userInterfaceMode?: 'standard' | 'integration';
  authenticationMode?: 'automatic' | 'ambient';
}
