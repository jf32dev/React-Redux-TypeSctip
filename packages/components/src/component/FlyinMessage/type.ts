export type TFlyinType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'description';

export type TOption = {
  action?: () => void;
  actionText?: string;
  closeIcon?: boolean;
  dismissTimeout?: number;
  id?: string;
  title?: string;
  type?: TFlyinType;
};

export type TFlyinMessage = {
  action?: () => void;
  actionText?: string;
  closeIcon?: boolean;
  dismissTimeout: number;
  id: string;
  title?: string;
  message: string;
  type: TFlyinType;
};
