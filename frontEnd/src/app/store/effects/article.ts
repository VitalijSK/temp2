import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import {
  LoadArticleFail,
  LOAD_ARTICLES,
  LoadArticlesSuccess,
  LoadArticleSuccess,
  EDIT_ARTICLE,
  ADD_ARTICLE,
  DELETE_ARTICLE,
  LOAD_ARTICLE,
  LOAD_OFFER_ARTICLE,
  SuccessOfferArticle,
  FailOfferArticle,
  LOAD_REJECT_ARTICLE,
  SuccessRejectArticle,
  FailRejectArticle,
  APPLY_ARTICLE,
  SuccessAllArticle,
  REJECT_ARTICLE
} from '../actions/article';
import { ArticleService } from '../../servies/article/article.service';
import Swal from 'sweetalert2';
import { IArticle } from 'src/app/interfaces/article';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private translate: TranslateService
  ) { }
  @Effect()
  laodRejectArticle$ = this.actions$.ofType(LOAD_REJECT_ARTICLE).pipe(
    mergeMap(() => this.articleService.getReject()),
    map((articles: IArticle[]) => {
      transform(articles);
      return new SuccessRejectArticle(articles);
    }),
    catchError(error => {
      return of(new FailRejectArticle());
    })
  );
  @Effect()
  laodOfferArticle$ = this.actions$.ofType(LOAD_OFFER_ARTICLE).pipe(
    mergeMap(() => this.articleService.getOffer()),
    map((articles: IArticle[]) => {
      transform(articles);
      return new SuccessOfferArticle(articles);
    }),
    catchError(error => {
      return of(new FailOfferArticle());
    })
  );
  @Effect()
  deleteArticle$ = this.actions$.ofType(DELETE_ARTICLE).pipe(
    mergeMap((data: Action & { id: string }) => this.articleService.deleteById(data.id)),
    mergeMap(() => this.articleService.getAll()),
    map(articles => {
      transform(articles);
      return new LoadArticlesSuccess(articles);
    }),
    catchError(error => {
      return of(new LoadArticleFail());
    })
  );

  @Effect()
  addArticle$ = this.actions$.ofType(ADD_ARTICLE).pipe(
    mergeMap((data: Action & { article: IArticle }) => this.articleService.add(data.article)),
    mergeMap(_ => this.translate.get('Article was added!')),
    tap((message: string) => {
      Swal(message);
    }),
    mergeMap(() => this.articleService.getAll()),
    map(articles => {
      transform(articles);
      return new LoadArticlesSuccess(articles);
    }),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get('Something gone wrong');
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of(new LoadArticleFail());
    })
  );

  @Effect()
  applyArticle$ = this.actions$.ofType(APPLY_ARTICLE).pipe(
    mergeMap((data: Action &  { id: string } ) => {
      return this.articleService.applyStatus(data.id);
    }),
    mergeMap(() => {
      const articles$ = this.articleService.getAll();
      const artcilesReject$ = this.articleService.getReject();
      const articleOffer$ = this.articleService.getOffer();

      return combineLatest(articles$, artcilesReject$, articleOffer$);
    }),
    map(([articles, reject, offer]) => {
      transform(articles);
      transform(reject);
      transform(offer);
      return new SuccessAllArticle (articles, reject, offer);
    }),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get('Something gone wrong');
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of();
    })
  );
  @Effect()
  rejectArticle$ = this.actions$.ofType(REJECT_ARTICLE).pipe(
    mergeMap((data: Action &  { id: string } ) => {
      return this.articleService.rejectStatus(data.id);
    }),
    mergeMap(() => {
      const articles$ = this.articleService.getAll();
      const artcilesReject$ = this.articleService.getReject();
      const articleOffer$ = this.articleService.getOffer();

      return combineLatest(articles$, artcilesReject$, articleOffer$);
    }),
    map(([articles, reject, offer]) => {
      transform(articles);
      transform(reject);
      transform(offer);
      return new SuccessAllArticle (articles, reject, offer);
    }),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get('Something gone wrong');
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of();
    })
  );
  @Effect()
  editArticle$ = this.actions$.ofType(EDIT_ARTICLE).pipe(
    mergeMap((data: Action & { article: IArticle & { id: string } }) => {
      return this.articleService.updateById(data.article);
    }),
    mergeMap(_ => this.translate.get('Your information was updated!')),
    tap((message: string) => {
      Swal(message);
    }),
    mergeMap(() => this.articleService.getAll()),
    map(articles => {
      transform(articles);
      return new LoadArticlesSuccess(articles);
    }),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get('Something gone wrong');
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of();
    })
  );
  @Effect()
  laodArticle$ = this.actions$.ofType(LOAD_ARTICLE).pipe(
    mergeMap((action: Action & { id: string }) => this.articleService.getById(action.id)),
    map(article => {
      return new LoadArticleSuccess(article);
    }),
    catchError(error => {
      return of(new LoadArticleFail());
    })
  );
  @Effect()
  loadArticles$ = this.actions$.ofType(LOAD_ARTICLES).pipe(
    mergeMap(() => this.articleService.getAll()),
    map(articles => {
      transform(articles);
      return new LoadArticlesSuccess(articles);
    }),
    catchError(error => {
      return of(new LoadArticleFail());
    })
  );
}

const transform = (articles) => {
  const size = 120;
  articles.forEach(article => {
    const { body } = article;
    if (body.length > size) {
      article.shortBody = body.slice(0, size) + '...';
    } else {
      article.shortBody = body;
    }
  });
}