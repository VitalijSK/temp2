import { IComment } from 'src/app/interfaces/comment';
import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import {
  FAIL_COMMENT,
  LOAD_COMMENTS,
  SUCCESS_COMMENTS,
  ADD_COMMENT,
  SUCCESS_COMMENTS_DELETE
} from '../actions/comment'

export interface ICommentState {
  comments: IComment[],
  error: boolean;
  loading: boolean;
  loaded: boolean;
}

export const INITIAL_STATE: ICommentState = {
  comments: [],
  error: false,
  loading: false,
  loaded: false
}
export function reducerComment(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FAIL_COMMENT:
      return Object.assign({}, state, {
        comment: null,
        comments: [],
        error: false,
        loading: false,
        loaded: false
      });
    case LOAD_COMMENTS:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        loaded: false,
      });
    case SUCCESS_COMMENTS:
      return Object.assign({}, state, {
        comments: action.loadComments,
        loading: false,
        error: false,
        loaded: true,
      });
    case SUCCESS_COMMENTS_DELETE:
      return Object.assign({}, state, {
      loading: false,
      error: false,
      loaded: true,
    });
    case ADD_COMMENT:
      return Object.assign({}, state, {
        loading: true,
      });
    default:
      return state;
  }
}

const getCommentsHelperComment = (state: ICommentState) => state.comments;
const getLoadingHelperComment = (state: ICommentState) => state.loading;
const getErrorHelperComment = (state: ICommentState) => state.error;


export const getCommentState = createFeatureSelector<ICommentState>('dataComment');


export const getLoadingComment = createSelector(
  getCommentState,
  getLoadingHelperComment,
);

export const getErrorComment = createSelector(
  getCommentState,
  getErrorHelperComment,
);


export const getAllComments = createSelector(
  getCommentState,
  getCommentsHelperComment,
);