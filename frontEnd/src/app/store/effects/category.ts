import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import {
  LoadCategoryFail,
  LOAD_CATEGORYS,
  LoadCategorysSuccess,
  ADD_CATEGORY,
  DELETE_CATEGORY
} from '../actions/category';
import { CategoryService } from '../../servies/category/category.service';
import Swal from 'sweetalert2';
import { ICategory } from 'src/app/interfaces/category';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private translate: TranslateService
  ) { }

  @Effect()
  addCategory$ = this.actions$.ofType(ADD_CATEGORY).pipe(
    mergeMap((data: Action & { category: ICategory }) => this.categoryService.add(data.category)),
    mergeMap(() => {
      const categorys$: Observable<ICategory[]> = this.categoryService.getAll();
      const text$: Observable<string> = this.translate.get('Category was added!');
      return combineLatest(categorys$, text$);
    }),
    map(([categorys, message]) => {
      Swal(message);
      return new LoadCategorysSuccess(categorys);
    }),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get(err.error.text);
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of(new LoadCategoryFail());
    })
  );
  @Effect()
  deleteCategory$ = this.actions$.ofType(DELETE_CATEGORY).pipe(
    mergeMap((data: Action & { id: string, idArticle : string }) => {
      const delete$ = this.categoryService.deleteById(data.id);
      return combineLatest(of(data.idArticle), delete$);
    }),
    mergeMap(() => this.categoryService.getAll()),
    map((categorys: ICategory[]) => new LoadCategorysSuccess(categorys)),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get(err.error.text);
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of(new LoadCategoryFail());
    })
  );
  @Effect()
  loadCategorys$ = this.actions$.ofType(LOAD_CATEGORYS).pipe(
    mergeMap(() => this.categoryService.getAll()),
    map((categorys: ICategory[]) => new LoadCategorysSuccess(categorys)),
    catchError(error => {
      return of(new LoadCategoryFail());
    })
  );
}