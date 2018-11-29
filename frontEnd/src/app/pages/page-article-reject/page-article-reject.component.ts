import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IArticleState, getRejectArticles } from 'src/app/store/reducers/article';
import { LoadRejectArticle } from '../../store';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/interfaces/article';


@Component({
  selector: 'app-page-article-reject',
  templateUrl: './page-article-reject.component.html',
  styleUrls: ['./page-article-reject.component.scss']
})
export class PageArticleRejectComponent implements OnInit {
  
  articles$ : Observable <IArticle[]>;

  constructor(private store : Store<IArticleState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadRejectArticle());
    this.articles$ = this.store.select(getRejectArticles);
  }
}
