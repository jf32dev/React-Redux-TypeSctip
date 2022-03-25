import { HubEntityType, UCContentType, ZunosEntityType } from './type';

export interface UCLink {
  url?: string;
}

export interface CustomField {
  name: string;
  value?: string;
  values?: string[];
}

export interface UCSearchResult {
  id: string;
  urn: string;
  type: UCContentType;
  entityType: ZunosEntityType | HubEntityType;
  name: string;
  description: string;
  thumbnailUrl?: string;
  createdAt: string;
  modifiedAt: string;
  publishDate?: string;
  expiryDate?: string;
  tags?: string[];
  customFields?: CustomField[];
  size?: number;
}
