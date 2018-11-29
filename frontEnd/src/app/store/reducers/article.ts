import { IArticle } from 'src/app/interfaces/article';
import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import {
  SUCCESS_ARTICLE,
  FAIL_ARTICLE,
  LOAD_ARTICLES,
  SUCCESS_ARTICLES,
  EDIT_ARTICLE,
  SUCCESS_EDIT_ARTICLE,
  ADD_ARTICLE,
  LOAD_OFFER_ARTICLE,
  FAIL_OFFER_ARTICLE,
  SUCCESS_OFFER_ARTICLE,
  LOAD_REJECT_ARTICLE,
  FAIL_REJECT_ARTICLE,
  SUCCESS_REJECT_ARTICLE,
  SUCCESS_ALL_ARTICLES
} from '../actions/article'

export interface IArticleState {
  article : IArticle,
  articles: IArticle[],
  articles_reject: IArticle[],
  articles_offer: IArticle[],
  error: boolean;
  loading: boolean;
  loaded: boolean;
}

export const INITIAL_STATE: IArticleState = {
  article : null,
  articles: [],
  articles_reject: [],
  articles_offer: [],
  error: false,
  loading: false,
  loaded: false
}
export function reducerArticle(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUCCESS_ARTICLE:
      return Object.assign({}, state, {
        article: Object.assign({}, action.loadArticle),
        loading: false,
        loaded: true,
        error: false
      });
    case FAIL_ARTICLE:
      return Object.assign({}, state, {
        article: null,
        articles: [],
        error: false,
        loading: false,
        loaded: false
      });
    case LOAD_ARTICLES:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        loaded: false,
      });
    case SUCCESS_ARTICLES:
      return Object.assign({}, state, {
        articles: action.loadArticles,
        loading: false,
        error: false,
        loaded: true,
      });
    case EDIT_ARTICLE:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        loaded: false,
      });
    case SUCCESS_EDIT_ARTICLE:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        loaded: true,
      });
      case ADD_ARTICLE:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOAD_OFFER_ARTICLE :
    return Object.assign({}, state, {
      loading: true,
    });
    case FAIL_OFFER_ARTICLE :
    return Object.assign({}, state, {
      error: true,
      loading: false,
      loaded : true,
      articles_offer : []
    });
    case SUCCESS_OFFER_ARTICLE :
    return Object.assign({}, state, {
      error: true,
      loading: false,
      loaded : true,
      articles_offer : action.articles
    });
    case SUCCESS_ALL_ARTICLES :
    const { articles_offer, articles_reject, articles } = action;
    return Object.assign({}, state, {
      error: false,
      loading: false,
      loaded : true,
      articles,
      articles_offer,
      articles_reject
    });
    case LOAD_REJECT_ARTICLE :
    return Object.assign({}, state, {
      loading: true,
    });
    case FAIL_REJECT_ARTICLE :
    return Object.assign({}, state, {
      error: true,
      loading: false,
      loaded : true,
      articles_reject : []
    });
    case SUCCESS_REJECT_ARTICLE :
    return Object.assign({}, state, {
      error: true,
      loading: false,
      loaded : true,
      articles_reject : action.articles
    });
    default:
      return state;
  }
}

const getArticleHelperArticle = (state: IArticleState) => state.article;
const getArticlesRejectHelperArticle = (state: IArticleState) => state.articles_reject;
const getArticlesOfferHelperArticle = (state: IArticleState) => state.articles_offer;
const getArticlesHelperArticle = (state: IArticleState) => state.articles;
const getLoadingHelperArticle = (state: IArticleState) => state.loading;
const getErrorHelperArticle = (state: IArticleState) => state.error;


export const getArticleState = createFeatureSelector<IArticleState>('dataArticle');


export const getOfferArticles = createSelector(
  getArticleState,
  getArticlesOfferHelperArticle
);

export const getRejectArticles = createSelector(
  getArticleState,
  getArticlesRejectHelperArticle
);

export const getLoadingArticle = createSelector(
  getArticleState,
  getLoadingHelperArticle,
);

export const getErrorArticle = createSelector(
  getArticleState,
  getErrorHelperArticle,
);

export const getArticle = createSelector(
  getArticleState,
  getArticleHelperArticle,
);

export const getAllArticles = createSelector(
  getArticleState,
  getArticlesHelperArticle,
);