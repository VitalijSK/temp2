import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import {
  LoadCommentFail,
  LOAD_COMMENTS,
  LoadCommentsSuccess,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/comment';
import { CommentService } from '../../servies/comment/comment.service';
import Swal from 'sweetalert2';
import { IComment } from 'src/app/interfaces/comment';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService,
    private translate: TranslateService
  ) { }

  @Effect()
  addComment$ = this.actions$.ofType(ADD_COMMENT).pipe(
    mergeMap((data: Action & { comment: IComment }) => this.commentService.add(data.comment)),
    mergeMap((id: string) => {
      const comments$: Observable<IComment[]> = this.commentService.getByAllId(id);
      const text$: Observable<string> = this.translate.get('Comment was added!');
      return combineLatest(comments$, text$);
    }),
    map(([comments, message]) => {
      Swal(message);
      return new LoadCommentsSuccess(comments);
    }),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get(err.error.text);
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of(new LoadCommentFail());
    })
  );
  @Effect()
  deleteComment$ = this.actions$.ofType(DELETE_COMMENT).pipe(
    mergeMap((data: Action & { id: string, idArticle : string }) => {
      const delete$ = this.commentService.deleteById(data.id);
      return combineLatest(of(data.idArticle), delete$);
    }),
    mergeMap(([idArticle, _]) => this.commentService.getByAllId(idArticle)),
    map((comments: IComment[]) => new LoadCommentsSuccess(comments)),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get(err.error.text);
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of(new LoadCommentFail());
    })
  );
  @Effect()
  loadComments$ = this.actions$.ofType(LOAD_COMMENTS).pipe(
    mergeMap((action: Action & { id: string }) => this.commentService.getByAllId(action.id)),
    map((comments: IComment[]) => new LoadCommentsSuccess(comments)),
    catchError(error => {
      return of(new LoadCommentFail());
    })
  );
}