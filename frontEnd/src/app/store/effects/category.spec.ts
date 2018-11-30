
import { CategoryEffects } from './category';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {Injector} from "@angular/core";
import { cold, hot } from 'jasmine-marbles';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoadCategorys, LoadCategorysSuccess, LoadCategoryFail } from '../actions/category';
import { CategoryService } from 'src/app/servies/category/category.service';
import { IComment } from 'src/app/interfaces/comment';
let translations: any = {"CARDS_TITLE": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('Category database', ()=> {
    let effects: CategoryEffects;
    let actions: Observable<any>;
    let articleService: CategoryService;
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
          CategoryEffects, provideMockActions(() => actions),
            HttpClient, HttpHandler,
            {
                provide: CategoryService,
                useValue: {
                  add: jest.fn(),
                  getById: jest.fn(),
                  getAll: jest.fn(),
                  updateById: jest.fn(),
                  getOffer: jest.fn(),
                  getByAllId : jest.fn()
                }
              }
        ]
      });
      injector = getTestBed();
      translate = injector.get(TranslateService);
      articleService = TestBed.get(CategoryService);
      effects = TestBed.get(CategoryEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadCategories', ()=> {
      it('should return an laodCategory action, with the categories, on success', () => {
        const category = generateCategory();
        const action = new LoadCategorys();
        const outcome = new LoadCategorysSuccess([category]);
  
        actions = hot('-a', { a: action });
        const response = cold('-a|', { a: [category] });
        const expected = cold('--b', { b: outcome });
        articleService.getAll = jest.fn(() => response);
        expect(effects.loadCategorys$).toBeObservable(expected);
      });
      it('should return a laodArticle action, with an error, on failure', () => {
        const action = new LoadCategorys();
        const outcome = new LoadCategoryFail();
        const error = new Error();

        actions = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        const expected = cold('--(b|)', { b: outcome });
        articleService.getAll = jest.fn(() => response);
        expect(effects.loadCategorys$).toBeObservable(expected);
      });
    });

    it('should be created', () => {
      expect(effects).toBeTruthy();
  });
});
const generateCategory = ()  => {
    return {
        id : '2',
        title: 'asd'   
    }
}

