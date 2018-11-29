import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/interfaces/category';
import { Store } from '@ngrx/store';
import { ICategoryState, getAllCategorys } from 'src/app/store/reducers/category';
import { LoadCategorys } from 'src/app/store';
import { IArticle } from 'src/app/interfaces/article';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.scss']
})
export class FormArticleComponent implements OnInit {

  @Output() submitArticle = new EventEmitter<IArticle>();
  articleForm !: FormGroup;
  categories$ : Observable<ICategory[]>;

  constructor(private fb: FormBuilder,
              private store : Store<ICategoryState>) { }

  ngOnInit() {
    this.articleForm = this.fb.group({
      category:  ['', [Validators.required]],
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
    this.store.dispatch(new LoadCategorys());
    this.categories$ = this.store.select(getAllCategorys);
  }
  checkInvalid(input: string) {
    return this.articleForm.controls[input].invalid &&
      (this.articleForm.controls[input].dirty ||
        this.articleForm.controls[input].touched)
  }

  checkValid(input: string) {
    return !this.checkInvalid(input) &&
      this.articleForm.controls[input].value !== '' &&
      this.articleForm.controls[input].value !== null;
  }
  onSubmit($event) {
    const article = {
      title : this.articleForm.get('title').value,
      body : this.articleForm.get('body').value,
      category_id : this.articleForm.get('category').value,
    }
    this.submitArticle.emit(article);
    this.articleForm.reset();
  }
}
