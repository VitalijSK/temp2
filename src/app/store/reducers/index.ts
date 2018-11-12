import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import {  IUserState, 
          reducer, 
          getUserHelper, 
          getRoleHelper, 
          getLoadingHelper, 
          getErrorHelper,	
          getUsersHelper} from './user';

export interface State {
  dataUser: IUserState;
}

export const reducers: ActionReducerMap<State> = {
  dataUser: reducer
};


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
      console.log('state', state);
      console.log('action', action);
      return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];


export const getUserState = createFeatureSelector<IUserState>('dataUser');

export const getUser = createSelector(
  getUserState,
  getUserHelper,
);

export const getRole = createSelector(
  getUserState,
  getRoleHelper,
);

export const getLoading = createSelector(
  getUserState,
  getLoadingHelper,
);

export const getError = createSelector(
  getUserState,
  getErrorHelper,
);

export const getUsers = createSelector(
  getUserState,
  getUsersHelper,
);