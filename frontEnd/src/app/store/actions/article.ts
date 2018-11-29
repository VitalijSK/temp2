import { Action } from '@ngrx/store';
import { IArticle } from 'src/app/interfaces/article';

export const SUCCESS_ARTICLE = '[Article] success loading';
export const FAIL_ARTICLE = '[Article] fail loading';
export const SUCCESS_ARTICLES = '[Article] success loading articles';
export const LOAD_ARTICLES = '[Article] loading articles';
export const SUCCESS_EDIT_ARTICLE = '[Article] success edit';
export const EDIT_ARTICLE = '[Article] edit article';
export const DELETE_ARTICLE = '[Article] delete';
export const ADD_ARTICLE = '[Article] add';
export const LOAD_ARTICLE = '[Article] load article';
export const REJECT_ARTICLE = '[Article] reject article';
export const APPLY_ARTICLE = '[Article] apply article';
export const LOAD_OFFER_ARTICLE = '[Article] load offer articles';
export const SUCCESS_OFFER_ARTICLE = '[Article] succes offer articles';
export const FAIL_OFFER_ARTICLE = '[Article] fail offer articles';
export const LOAD_REJECT_ARTICLE = '[Article] load reject articles';
export const SUCCESS_REJECT_ARTICLE = '[Article] succes reject articles';
export const FAIL_REJECT_ARTICLE = '[Article] fail reject articles';
export const SUCCESS_ALL_ARTICLES = '[Article] success loadinng all articles';

export class LoadRejectArticle implements Action {
  readonly type = LOAD_REJECT_ARTICLE;

  constructor() { }
}
export class FailRejectArticle implements Action {
  readonly type = FAIL_REJECT_ARTICLE;

  constructor() { }
}
export class SuccessRejectArticle implements Action {
  readonly type = SUCCESS_REJECT_ARTICLE;

  constructor(public articles: IArticle[]) { }
}

export class LoadOfferArticle implements Action {
  readonly type = LOAD_OFFER_ARTICLE;

  constructor() { }
}
export class FailOfferArticle implements Action {
  readonly type = FAIL_OFFER_ARTICLE;

  constructor() { }
}
export class SuccessOfferArticle implements Action {
  readonly type = SUCCESS_OFFER_ARTICLE;

  constructor(public articles: IArticle[]) { }
}

export class LoadArticle implements Action {
  readonly type = LOAD_ARTICLE;

  constructor(public id : string) { }
}
export class AddArticle implements Action {
  readonly type = ADD_ARTICLE;

  constructor(public article : IArticle) { }
}
export class LoadArticleSuccess implements Action {
  readonly type = SUCCESS_ARTICLE;

  constructor(public loadArticle: IArticle) {  }
}
export class LoadArticleFail implements Action {
  readonly type = FAIL_ARTICLE;

  constructor() {  }
}
export class ApplyArticle implements Action {
  readonly type = APPLY_ARTICLE;

  constructor(public id : string) {  }
}
export class RejectArticle implements Action {
  readonly type = REJECT_ARTICLE;

  constructor(public id : string) {  }
}

export class LoadArticles implements Action {
  readonly type = LOAD_ARTICLES;

  constructor() { }
}
export class LoadArticlesSuccess implements Action {
readonly type = SUCCESS_ARTICLES;

constructor(public loadArticles: IArticle[]) {  }
}
export class EditArticle implements Action {
  readonly type = EDIT_ARTICLE;

  constructor(public article: IArticle) { }
}
export class EditArticleSuccess implements Action {
readonly type = SUCCESS_EDIT_ARTICLE;

constructor() {  }
}
export class DeleteArticle implements Action {
  readonly type = DELETE_ARTICLE;
  
  constructor(public id: string) {  }
  }
  export class SuccessAllArticle implements Action {
    readonly type = SUCCESS_ALL_ARTICLES;
    
    constructor(public articles : IArticle[], 
                public articles_reject : IArticle[], 
                public articles_offer : IArticle[]) {  }
    }
export type ActionArticle = LoadArticle | LoadArticleSuccess| LoadArticleSuccess | LoadArticleFail |
                     LoadArticles | LoadArticlesSuccess |
                     EditArticle | EditArticleSuccess |
                     DeleteArticle | AddArticle |
                     LoadOfferArticle | SuccessOfferArticle | FailOfferArticle |
                     LoadRejectArticle | SuccessRejectArticle | FailRejectArticle|
                     ApplyArticle | RejectArticle | SuccessAllArticle ;