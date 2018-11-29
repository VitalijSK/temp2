import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IArticleState } from 'src/app/store/reducers/article';
import { ActivatedRoute } from '@angular/router';
import { LoadArticle, getArticle } from 'src/app/store';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/interfaces/article';

@Component({
  selector: 'app-page-article',
  templateUrl: './page-article.component.html',
  styleUrls: ['./page-article.component.scss']
})
export class PageArticleComponent implements OnInit {

  article$ : Observable<IArticle>;
  
  constructor(private store : Store<IArticleState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getArticle();
  }
  getArticle() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadArticle(id));
    this.article$ = this.store.select(getArticle);
  }

}
