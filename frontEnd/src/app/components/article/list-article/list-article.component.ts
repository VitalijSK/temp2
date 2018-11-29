import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/interfaces/article';
import { Store } from '@ngrx/store';
import { IArticleState } from 'src/app/store/reducers/article';
import { RejectArticle, ApplyArticle } from 'src/app/store';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {

  @Input() articles : IArticle[];
  @Input() admin : boolean;

  constructor(private store : Store<IArticleState>) { }

  ngOnInit() {
    
  }
  deleteId(id : string) {
    this.store.dispatch(new RejectArticle(id));
  }
  applyId(id : string) {
    this.store.dispatch(new ApplyArticle(id));
  }
}
