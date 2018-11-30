
import { ArticleEffects } from './article';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {Injector} from "@angular/core";
import { cold, hot } from 'jasmine-marbles';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoadOfferArticle, SuccessOfferArticle, LoadArticle, LoadArticleSuccess, LoadArticleFail, LoadArticles, LoadArticlesSuccess, AddArticle, DeleteArticle } from '../actions';
import { ArticleService } from 'src/app/servies/article/article.service';
let translations: any = {"CARDS_TITLE": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('Article database', ()=> {
    let effects: ArticleEffects;
    let actions: Observable<any>;
    let articleService: ArticleService;
    let translate: TranslateService;
    let injector:  Injector;
  
    it('true is true', () => expect(true).toBe(true));
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: FakeLoader},
          })
        ],
        providers: [
            ArticleEffects, provideMockActions(() => actions),
            HttpClient, HttpHandler,
            {
                provide: ArticleService,
                useValue: {
                  add: jest.fn(),
                  getById: jest.fn(),
                  getAll: jest.fn(),
                  updateById: jest.fn(),
                  getOffer: jest.fn()
                }
              }
        ]
      });
      injector = getTestBed();
      translate = injector.get(TranslateService);
      articleService = TestBed.get(ArticleService);
      effects = TestBed.get(ArticleEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadArticle', ()=> {
      it('should return an laodArticle action, with the article, on success', () => {
        const article = generateArticle();
        const action = new LoadArticle(article.id);
        const outcome = new LoadArticleSuccess(article);
  
        actions = hot('-a', { a: action });
        const response = cold('-a|', { a: article });
        const expected = cold('--b', { b: outcome });
        articleService.getById = jest.fn(() => response);
        expect(effects.laodArticle$).toBeObservable(expected);
      });
      it('should return a laodArticle action, with an error, on failure', () => {
        const article = generateArticle();
        const action = new LoadArticle(article.id);
        const error = new Error();
        const outcome = new LoadArticleFail();

        actions = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        const expected = cold('--(b|)', { b: outcome });
        articleService.getById = jest.fn(() => response);

        expect(effects.laodArticle$).toBeObservable(expected);
      });
    });

    it('should be created', () => {
      expect(effects).toBeTruthy();
  });
  describe('loadArticles', ()=> {
    it('should return an laodArticles action, with the articles, on success', () => {
      const articles = [generateArticle()];
      const action = new LoadArticles();
      const outcome = new LoadArticlesSuccess(articles);

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: articles });
      const expected = cold('--b', { b: outcome });
      articleService.getAll = jest.fn(() => response);
      expect(effects.loadArticles$).toBeObservable(expected);
    });
    it('should return a laodArticles action, with an error, on failure', () => {
      const error = new Error();
      const action = new LoadArticles();
      const outcome = new LoadArticleFail();

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--(b|)', { b: outcome });
      articleService.getAll = jest.fn(() => response);

      expect(effects.loadArticles$).toBeObservable(expected);
    });
  });
   
});
const generateArticle = () => {
    return {
        id : '2',
        title : 'test',
        body : 'body',
        category_id : '1',
        user_id : '1',
        date : 'Thue 10 2018'   
    }
}