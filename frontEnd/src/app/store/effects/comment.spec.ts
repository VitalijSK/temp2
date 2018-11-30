
import { CommentEffects } from './comment';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {Injector} from "@angular/core";
import { cold, hot } from 'jasmine-marbles';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoadComments, LoadCommentsSuccess, LoadCommentFail } from '../actions/comment';
import { CommentService } from 'src/app/servies/comment/comment.service';
import { IComment } from 'src/app/interfaces/comment';
let translations: any = {"CARDS_TITLE": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('Comment database', ()=> {
    let effects: CommentEffects;
    let actions: Observable<any>;
    let articleService: CommentService;
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
            CommentEffects, provideMockActions(() => actions),
            HttpClient, HttpHandler,
            {
                provide: CommentService,
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
      articleService = TestBed.get(CommentService);
      effects = TestBed.get(CommentEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadComments', ()=> {
      it('should return an loadComments action, with the comments, on success', () => {
        const comment = generateComment();
        const action = new LoadComments(comment.id);
        const outcome = new LoadCommentsSuccess([comment]);
  
        actions = hot('-a', { a: action });
        const response = cold('-a|', { a: [comment] });
        const expected = cold('--b', { b: outcome });
        articleService.getByAllId = jest.fn(() => response);
        expect(effects.loadComments$).toBeObservable(expected);
      });
      it('should return a loadComments action, with an error, on failure', () => {
        const comment = generateComment();
        const action = new LoadComments(comment.id);
        const outcome = new LoadCommentFail();
        const error = new Error();

        actions = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        const expected = cold('--(b|)', { b: outcome });
        articleService.getByAllId = jest.fn(() => response);
        expect(effects.loadComments$).toBeObservable(expected);
      });
    });

    it('should be created', () => {
      expect(effects).toBeTruthy();
  });
});
const generateComment = () : IComment => {
    return {
        id : '2',
        text: 'asd'   
    }
}