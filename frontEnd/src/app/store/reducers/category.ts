import { ICategory } from 'src/app/interfaces/category';
import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import {
  FAIL_CATEGORY,
  LOAD_CATEGORYS,
  SUCCESS_CATEGORYS,
  ADD_CATEGORY,
  SUCCESS_CATEGORYS_DELETE
} from '../actions/category'

export interface ICategoryState {
  categorys: ICategory[],
  error: boolean;
  loading: boolean;
  loaded: boolean;
}

export const INITIAL_STATE: ICategoryState = {
  categorys: [],
  error: false,
  loading: false,
  loaded: false
}
export function reducerCategory(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FAIL_CATEGORY:
      return Object.assign({}, state, {
        categorys: [],
        error: false,
        loading: false,
        loaded: false
      });
    case LOAD_CATEGORYS:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        loaded: false,
      });
    case SUCCESS_CATEGORYS:
      return Object.assign({}, state, {
        categorys: action.loadCategorys,
        loading: false,
        error: false,
        loaded: true,
      });
    case SUCCESS_CATEGORYS_DELETE:
      return Object.assign({}, state, {
      loading: false,
      error: false,
      loaded: true,
    });
    case ADD_CATEGORY:
      return Object.assign({}, state, {
        loading: true,
      });
    default:
      return state;
  }
}

const getCategorysHelperCategory = (state: ICategoryState) => state.categorys;
const getLoadingHelperCategory = (state: ICategoryState) => state.loading;
const getErrorHelperCategory = (state: ICategoryState) => state.error;


export const getCategoryState = createFeatureSelector<ICategoryState>('dataCategory');


export const getLoadingCategory = createSelector(
  getCategoryState,
  getLoadingHelperCategory,
);

export const getErrorCategory = createSelector(
  getCategoryState,
  getErrorHelperCategory,
);


export const getAllCategorys = createSelector(
  getCategoryState,
  getCategorysHelperCategory,
);