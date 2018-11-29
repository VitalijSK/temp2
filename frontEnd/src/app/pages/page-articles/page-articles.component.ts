import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IArticleState } from 'src/app/store/reducers/article';
import { getAllArticles, LoadArticles } from '../../store';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/interfaces/article';

@Component({
  selector: 'app-page-articles',
  templateUrl: './page-articles.component.html',
  styleUrls: ['./page-articles.component.scss']
})
export class PageArticlesComponent implements OnInit {

  articles$ : Observable <IArticle[]>;

  constructor(private store : Store<IArticleState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadArticles());
    this.articles$ = this.store.select(getAllArticles);
  }

}
