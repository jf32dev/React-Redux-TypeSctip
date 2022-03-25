import { UCLink, UCSearchResult } from './entities';

interface UCError {
  code: 'unknown' | 'invalidRequestData';
  message?: string;
  details?: Record<string, unknown>;
  exceptionInfo?: any;
}

interface BaseResponse {
  version?: string;
  tranceIdentifier?: string;
  error?: UCError;
}

export interface UCPaginated<T> {
  totalResultCount: number;
  items: T[];
}

export interface UCLinkResponse extends BaseResponse {
  data: UCLink;
}

export interface UCSearchResponse extends BaseResponse {
  data: UCPaginated<UCSearchResult>;
}
