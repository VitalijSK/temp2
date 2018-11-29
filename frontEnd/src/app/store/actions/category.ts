import { Action } from '@ngrx/store';
import { ICategory } from 'src/app/interfaces/category';

export const FAIL_CATEGORY = '[Category] fail loading';
export const SUCCESS_CATEGORYS = '[Category] success loading categorys';
export const LOAD_CATEGORYS = '[Category] loading categorys';
export const ADD_CATEGORY = '[Category] add';
export const SUCCESS_CATEGORYS_DELETE = '[Category] success delete';
export const DELETE_CATEGORY = '[Category] delete category';


export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;

  constructor(public category : ICategory) { }
}

export class LoadCategoryFail implements Action {
  readonly type = FAIL_CATEGORY;

  constructor() {  }
}
export class DeleteCategory implements Action {
  readonly type = DELETE_CATEGORY;

  constructor(public id : string) {  }
}

export class LoadCategorys implements Action {
  readonly type = LOAD_CATEGORYS;

  constructor() { }
}
export class LoadCategorysSuccess implements Action {
readonly type = SUCCESS_CATEGORYS;

constructor(public loadCategorys: ICategory[]) {  }
}
export class DeleteCategorysSuccess implements Action {
  readonly type = SUCCESS_CATEGORYS_DELETE;
  
  constructor() {  }
  }
export type ActionCategory = LoadCategoryFail |
                     LoadCategorys | LoadCategorysSuccess |
                     AddCategory | DeleteCategorysSuccess | DeleteCategory;