import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICommentState, getAllComments } from 'src/app/store/reducers/comment';
import { LoadComments, DeleteComment, AddComment, getUser, getRole } from 'src/app/store';
import { IComment } from 'src/app/interfaces/comment';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() articleId: string;
  comments$: Observable<IComment[]>;
  role$ : Observable< string >;
  id: string;

  constructor(private store: Store<ICommentState>) { }

  ngOnInit() {
    this.store.select(getUser).pipe(
      filter(user => user !== null && user.id !== undefined),
      tap(user => {
        this.id = user.id;
      })
    ).subscribe();
    this.store.dispatch(new LoadComments(this.articleId));
    this.comments$ = this.store.select(getAllComments);
    this.role$ = this.store.select(getRole);
  }
  deleteId(id : string) {
    this.store.dispatch(new DeleteComment(id, this.articleId));
  }
  sendComment(body: string) {
    const comment = {
      text: body,
      date: new Date().toDateString(),
      article_id: this.articleId,
      user_id: this.id
    }
    this.store.dispatch(new AddComment(comment));
  }
}
