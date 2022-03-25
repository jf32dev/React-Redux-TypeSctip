import { Action } from 'redux';
import { Product } from '../../api/services/product/type';
import { TStatus } from '../sharedType';

export interface ProductState {
  productList: {
    status: TStatus;
    data: Product[];
    hasMore: boolean;
    error?: string | null;
    isDeleting: string | null;
    deleteError?: string | null;
  };

  selectedProduct: {
    status: TStatus;
    data: Product | null;
    error?: string | null;
    isSaving: boolean;
    savingError?: string | null;
  };
}
export const GET_PRODUCT_LIST_DATA_REQUEST =
  'product/getProductListDataRequest';
export const GET_PRODUCT_LIST_DATA_SUCCESS =
  'product/getProductListDataSuccess';
export const GET_PRODUCT_LIST_DATA_FAIL = 'product/getProductListDataFail';

export const CLEAR_PRODUCT_LIST_DATA = 'product/clearProductListData';

export const GET_SELECTED_PRODUCT_REQUEST = 'product/getSelectedProductRequest';
export const GET_SELECTED_PRODUCT_SUCCESS = 'product/getSelectedProductSuccess';
export const GET_SELECTED_PRODUCT_FAIL = 'product/getSelectedProductFail';

export const CLEAR_SELECTED_PRODUCT = 'product/clearSelectedProduct';

export const SAVE_PRODUCT_REQUEST = 'product/saveProductRequest';
export const SAVE_PRODUCT_SUCCESS = 'product/saveProductSuccess';
export const SAVE_PRODUCT_FAIL = 'product/saveProductFail';

export const DELETE_PRODUCT_REQUEST = 'product/deleteProductRequest';
export const DELETE_PRODUCT_SUCCESS = 'product/deleteProductSuccess';
export const DELETE_PRODUCT_FAIL = 'product/deleteProductFail';

interface GetProductDataRequestAction
  extends Action<typeof GET_PRODUCT_LIST_DATA_REQUEST> {}
interface GetProductDataRequestSuccessAction
  extends Action<typeof GET_PRODUCT_LIST_DATA_SUCCESS> {
  payload: {
    data: Product[];
    hasMore: boolean;
  };
}

interface GetProductDataRequestFailAction
  extends Action<typeof GET_PRODUCT_LIST_DATA_FAIL> {
  error?: string;
}

interface ClearProductListDataAction
  extends Action<typeof CLEAR_PRODUCT_LIST_DATA> {}

// DELETE PRODUCT
interface DeleteProductRequestAction
  extends Action<typeof DELETE_PRODUCT_REQUEST> {
  payload: string;
}

interface DeleteProductRequestSuccessAction
  extends Action<typeof DELETE_PRODUCT_SUCCESS> {
  payload: string;
}

interface DeleteProductRequestFailAction
  extends Action<typeof DELETE_PRODUCT_FAIL> {
  error?: string;
}

// GET SELECTED PRODUCT
interface GetSelectedProductRequestAction
  extends Action<typeof GET_SELECTED_PRODUCT_REQUEST> {}
interface GetSelectedProductRequestSuccessAction
  extends Action<typeof GET_SELECTED_PRODUCT_SUCCESS> {
  payload: Product;
}

interface GetSelectedProductRequestFailAction
  extends Action<typeof GET_SELECTED_PRODUCT_FAIL> {
  error?: string;
}

interface ClearSelectedProductAction
  extends Action<typeof CLEAR_SELECTED_PRODUCT> {}

// SAVE PRODUCT
interface SaveProductRequestAction
  extends Action<typeof SAVE_PRODUCT_REQUEST> {}

interface SaveProductRequestSuccessAction
  extends Action<typeof SAVE_PRODUCT_SUCCESS> {}

interface SaveProductRequestFailAction
  extends Action<typeof SAVE_PRODUCT_FAIL> {
  error?: string;
}

export type ProductActionTypes =
  | GetProductDataRequestAction
  | GetProductDataRequestSuccessAction
  | GetProductDataRequestFailAction
  | ClearProductListDataAction
  | DeleteProductRequestAction
  | DeleteProductRequestSuccessAction
  | DeleteProductRequestFailAction
  | GetSelectedProductRequestAction
  | GetSelectedProductRequestSuccessAction
  | GetSelectedProductRequestFailAction
  | ClearSelectedProductAction
  | SaveProductRequestAction
  | SaveProductRequestSuccessAction
  | SaveProductRequestFailAction;
