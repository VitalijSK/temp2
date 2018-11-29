import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IArticleState, getOfferArticles } from 'src/app/store/reducers/article';
import { LoadOfferArticle, getRole } from '../../store';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/interfaces/article';

@Component({
  selector: 'app-page-article-offer',
  templateUrl: './page-article-offer.component.html',
  styleUrls: ['./page-article-offer.component.scss']
})
export class PageArticleOfferComponent implements OnInit {
  
  articles$ : Observable <IArticle[]>;
  role$ : Observable <string>;

  constructor(private store : Store<IArticleState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadOfferArticle());
    this.articles$ = this.store.select(getOfferArticles);
    this.role$ = this.store.select(getRole);
  }

}
