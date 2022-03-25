import {
  ProductState,
  ProductActionTypes,
  GET_PRODUCT_LIST_DATA_SUCCESS,
  GET_PRODUCT_LIST_DATA_REQUEST,
  GET_PRODUCT_LIST_DATA_FAIL,
  CLEAR_PRODUCT_LIST_DATA,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_REQUEST,
  SAVE_PRODUCT_FAIL,
  GET_SELECTED_PRODUCT_SUCCESS,
  GET_SELECTED_PRODUCT_REQUEST,
  GET_SELECTED_PRODUCT_FAIL,
  CLEAR_SELECTED_PRODUCT,
} from './type';

const initialState: ProductState = {
  selectedProduct: {
    status: 'idle',
    data: null,
    error: null,
    isSaving: false,
    savingError: null,
  },
  productList: {
    status: 'idle',
    data: [],
    hasMore: true,
    error: null,
    isDeleting: null,
    deleteError: null,
  },
};

const reducer = (
  state: ProductState = initialState,
  action: ProductActionTypes
): ProductState => {
  switch (action.type) {
    case GET_PRODUCT_LIST_DATA_REQUEST:
      return {
        ...state,
        productList: {
          ...state.productList,
          status: 'loading',
        },
      };
    case GET_PRODUCT_LIST_DATA_SUCCESS:
      return {
        ...state,
        productList: {
          ...state.productList,
          data: [...state.productList.data, ...action.payload.data],
          hasMore: action.payload.hasMore,
          status: 'succeeded',
        },
      };

    case GET_PRODUCT_LIST_DATA_FAIL:
      return {
        ...state,
        productList: {
          ...state.productList,
          error: action.error,
          status: 'failed',
        },
      };

    case CLEAR_PRODUCT_LIST_DATA:
      return {
        ...state,
        productList: {
          ...state.productList,
          data: [],
          hasMore: true,
          status: 'idle',
        },
      };

    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        productList: {
          ...state.productList,
          isDeleting: action.payload,
        },
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: {
          ...state.productList,
          data: state.productList.data.filter(
            (product) => product.id !== action.payload
          ),
          isDeleting: null,
        },
      };

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        productList: {
          ...state.productList,
          isDeleting: null,
          deleteError: action.error,
        },
      };

    case SAVE_PRODUCT_REQUEST:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          isSaving: true,
        },
      };
    case SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          isSaving: false,
          savingError: null,
        },
      };

    case SAVE_PRODUCT_FAIL:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          isSaving: false,
          savingError: action.error,
        },
      };

    case GET_SELECTED_PRODUCT_REQUEST:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          status: 'loading',
        },
      };
    case GET_SELECTED_PRODUCT_SUCCESS:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          data: action.payload,
          status: 'succeeded',
        },
      };
    case GET_SELECTED_PRODUCT_FAIL:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          error: action.error,
          status: 'failed',
        },
      };
    case CLEAR_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: {
          isSaving: false,
          savingError: null,
          error: null,
          status: 'idle',
          data: null,
        },
      };
    default:
      return state;
  }
};

export default reducer;
