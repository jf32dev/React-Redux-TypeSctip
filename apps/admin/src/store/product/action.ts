import { RouterAction, push } from 'connected-react-router';
import { AppThunkAction } from '../index';
import {
  ProductActionTypes,
  GET_PRODUCT_LIST_DATA_REQUEST,
  GET_PRODUCT_LIST_DATA_FAIL,
  GET_PRODUCT_LIST_DATA_SUCCESS,
  CLEAR_PRODUCT_LIST_DATA,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  GET_SELECTED_PRODUCT_REQUEST,
  GET_SELECTED_PRODUCT_FAIL,
  GET_SELECTED_PRODUCT_SUCCESS,
  SAVE_PRODUCT_REQUEST,
  SAVE_PRODUCT_FAIL,
  SAVE_PRODUCT_SUCCESS,
  CLEAR_SELECTED_PRODUCT,
} from './type';
import productService from '../../api/services/product';
import { ProductBase } from '../../api/services/product/type';
import { CalculatorType } from '../../api/services/calculator/type';

export const getProductListData = (
  id: string,
  limit: number = 20
): AppThunkAction<ProductActionTypes> => async (dispatch, getState) => {
  dispatch({
    type: GET_PRODUCT_LIST_DATA_REQUEST,
  });

  const productList = await productService.getProductList(
    id,
    limit,
    getState().product.productList.data.length
  );

  if (productList.value) {
    const { data } = productList.value.data;
    dispatch({
      type: GET_PRODUCT_LIST_DATA_SUCCESS,
      payload: {
        data,
        hasMore: data.length === limit,
      },
    });
    return;
  }
  dispatch({
    type: GET_PRODUCT_LIST_DATA_FAIL,
    error: productList.error?.message,
  });
};

export const clearProductListData = () => ({
  type: CLEAR_PRODUCT_LIST_DATA,
});

export const deleteProduct = (
  productId: string
): AppThunkAction<ProductActionTypes> => async (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT_REQUEST,
    payload: productId,
  });

  const deleteResponse = await productService.deleteProduct(productId);

  if (productId) {
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });
    return;
  }

  dispatch({
    type: DELETE_PRODUCT_FAIL,
    error: deleteResponse.error?.message,
  });
};

export const getSelectedProduct = (
  productId: string
): AppThunkAction<ProductActionTypes> => async (dispatch) => {
  dispatch({
    type: GET_SELECTED_PRODUCT_REQUEST,
  });

  const productData = await productService.getProductById(productId);

  if (productData.value) {
    dispatch({
      type: GET_SELECTED_PRODUCT_SUCCESS,
      payload: productData.value.data.data,
    });
    return;
  }

  dispatch({
    type: GET_SELECTED_PRODUCT_FAIL,
    error: productData.error?.message,
  });
};

export const saveProductData = (
  calculatorType: CalculatorType,
  data: ProductBase & { calculatorId: string; id: string },
  image: File | null,
  action: 'add' | 'edit'
): AppThunkAction<ProductActionTypes | RouterAction> => async (dispatch) => {
  dispatch({
    type: SAVE_PRODUCT_REQUEST,
  });

  const { calculatorId, id, ...product } = data;
  if (image) {
    // Save image to the server and get its ID
    const imageResponse = await saveBackgroundImage(image as File);
    if (imageResponse.value?.data) {
      product.image = imageResponse.value?.data.data;
    } else {
      dispatch({
        type: SAVE_PRODUCT_FAIL,
        error: 'Image could not be saved. Please try again.',
      });
      return;
    }
  }

  let response;

  if (action === 'add' && calculatorId) {
    response = await productService.createProduct(calculatorId, product);
  }

  if (action === 'edit' && id) {
    response = await productService.editProduct(id, product);
  }

  if (response?.value) {
    const responseData = response.value.data;
    dispatch({
      type: SAVE_PRODUCT_SUCCESS,
    });

    dispatch(
      push(
        `/calculator/data/${responseData.country}/${calculatorType}/${responseData.calculatorId}`
      )
    );
    return;
  }

  dispatch({
    type: SAVE_PRODUCT_FAIL,
    error: response?.error?.message,
  });
};

export const saveBackgroundImage = async (image: File) => {
  const formData = new FormData();
  formData.append('file', image);
  return productService.createImage(formData);
};

export const clearSelectedProduct = () => ({
  type: CLEAR_SELECTED_PRODUCT,
});
