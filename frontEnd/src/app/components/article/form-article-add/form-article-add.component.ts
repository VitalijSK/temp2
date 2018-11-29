import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IArticleState } from 'src/app/store/reducers/article';
import { AddArticle, getUser } from 'src/app/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-article-add',
  templateUrl: './form-article-add.component.html',
  styleUrls: ['./form-article-add.component.scss']
})
export class FormArticleAddComponent implements OnInit {

  constructor(private store : Store<IArticleState>) { }

  ngOnInit() {
  }
  addArticle(article) {
    article.date = new Date().toDateString();
    this.store.select(getUser).pipe(
      tap(user => {
        article.user_id = user.id;
        this.store.dispatch(new AddArticle(article));
      })
    ).subscribe();
  }
}
