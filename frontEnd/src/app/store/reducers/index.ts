import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import {
  IUserState,
  reducer
} from './user';
export {
  getUser,
  getRole,
  getLoading,
  getError,
  getUsers
} from './user';
import {
  IArticleState,
  reducerArticle
} from './article';
export {
  getLoadingArticle,
  getErrorArticle,
  getArticle,
  getAllArticles
} from './article';

import {
  ICommentState,
  reducerComment
} from './comment';
export {
  getAllComments,
  getLoadingComment,
  getErrorComment
} from './comment';

import {
  ICategoryState,
  reducerCategory
} from './category';
export {
  getAllCategorys,
  getLoadingCategory,
  getErrorCategory
} from './category';

export interface State {
  dataUser: IUserState;
  dataArticle: IArticleState;
  dataComment : ICommentState;
  dataCategory : ICategoryState;
}

export const reducers: ActionReducerMap<State> = {
  dataUser: reducer,
  dataArticle: reducerArticle,
  dataComment : reducerComment,
  dataCategory : reducerCategory
};


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];

