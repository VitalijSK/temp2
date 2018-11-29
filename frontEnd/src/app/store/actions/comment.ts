import { Action } from '@ngrx/store';
import { IComment } from 'src/app/interfaces/comment';

export const FAIL_COMMENT = '[Comment] fail loading';
export const SUCCESS_COMMENTS = '[Comment] success loading comments';
export const LOAD_COMMENTS = '[Comment] loading comments';
export const ADD_COMMENT = '[Comment] add';
export const SUCCESS_COMMENTS_DELETE = '[Comment] success delete';
export const DELETE_COMMENT = '[Comment] delete comment';


export class AddComment implements Action {
  readonly type = ADD_COMMENT;

  constructor(public comment : IComment) { }
}

export class LoadCommentFail implements Action {
  readonly type = FAIL_COMMENT;

  constructor() {  }
}
export class DeleteComment implements Action {
  readonly type = DELETE_COMMENT;

  constructor(public id : string, public idArticle: string) {  }
}

export class LoadComments implements Action {
  readonly type = LOAD_COMMENTS;

  constructor(public id : string) { }
}
export class LoadCommentsSuccess implements Action {
readonly type = SUCCESS_COMMENTS;

constructor(public loadComments: IComment[]) {  }
}
export class DeleteCommentsSuccess implements Action {
  readonly type = SUCCESS_COMMENTS_DELETE;
  
  constructor() {  }
  }
export type ActionComment = LoadCommentFail |
                     LoadComments | LoadCommentsSuccess |
                     AddComment | DeleteCommentsSuccess | DeleteComment;