export type UCTarget = 'hub' | 'zunos';

export type UCSortField = 'score' | 'name' | 'modifiedDate';

export type UCSortDirection = 'ascending' | 'descending';

export type UCContentType =
  | 'story'
  | 'form'
  | 'folder'
  | 'quiz'
  | 'achievement'
  | 'leaderboard'
  | 'course'
  | 'assignment'
  | 'video'
  | 'image'
  | 'audio'
  | 'document'
  | 'powerPoint'
  | 'word'
  | 'excel'
  | 'keynote'
  | 'pages'
  | 'numbers'
  | 'webpage'
  | 'microsite'
  | 'pdf'
  | 'unknown'
  | 'contPage'
  | 'app'
  | 'cad'
  | 'csv'
  | 'eBook'
  | 'ePub'
  | 'iBooks'
  | 'oomph'
  | 'prov'
  | 'rtf'
  | 'scrollmotion'
  | 'twixl'
  | 'txt'
  | 'vcard'
  | 'visio'
  | 'web'
  | 'zip';

export type ZunosEntityType =
  | 'MediaContent'
  | 'FormLayout'
  | 'MediaContentGroup'
  | 'Quiz'
  | 'AchievementGroup'
  | 'Leaderboard'
  | 'Course'
  | 'Assignment';

export type HubEntityType = 'story' | 'file';

export type UCOptionsInclude = 'customFields' | 'tags';

export type UCThumbnailSizeHint = 'none' | 'medium' | 'large' | 'original';
