import { IUser } from 'src/app/interfaces/user';
import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import {
  SUCCESS_USER,
  LOAD_USER,
  FAIL_USER,
  AUTH_USER,
  LOGOUT_USER,
  LOGOUT_SUCCESS_USER,
  FAIL_AUTH_USER,
  LOAD_USERS,
  SUCCESS_USERS,
  SUCCESS_EDIT,
  EDIT_USER,
  SETTING_USER,
  ADD_USER
} from '../actions/user'

export interface IUserState {
  user: IUser;
  users: IUser[],
  role: string;
  error: boolean;
  loading: boolean;
  loaded: boolean;
}

export const INITIAL_STATE: IUserState = {
  user: null,
  users: [],
  role:'0',
  error: false,
  loading: false,
  loaded: false
}
export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETTING_USER:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        loaded: false
      });
    case LOAD_USER:
      return Object.assign({}, state, {
        user: Object.assign({}, action.user),
        role: state.role,
        loading: true,
        error: false,
        loaded: false
      });
    case SUCCESS_USER:
      return Object.assign({}, state, {
        user: Object.assign({}, action.loadUser),
        role: action.loadUser.role,
        loading: false,
        loaded: true,
        error: false
      });
    case FAIL_USER:
      return Object.assign({}, state, {
        user: null,
        users: [],
        role: 0,
        error: false,
        loading: false,
        loaded: false
      });
    case FAIL_AUTH_USER:
      return Object.assign({}, state, {
        user: null,
        role: 0,
        error: true,
        loading: false,
        loaded: false
      });
    case AUTH_USER:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        loaded: false,
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        loaded: false,
      });
    case LOGOUT_SUCCESS_USER:
      return Object.assign({}, state, {
        user: null,
        role: 0,
        loading: false,
        error: false,
        loaded: false,
      });
    case LOAD_USERS:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        loaded: false,
      });
    case SUCCESS_USERS:
      return Object.assign({}, state, {
        users: action.loadUsers.filter(filterById(state.user.id)),
        loading: false,
        error: false,
        loaded: true,
      });
    case EDIT_USER:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        loaded: false,
      });
    case SUCCESS_EDIT:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        loaded: true,
      });
      case ADD_USER:
      return Object.assign({}, state, {
        loading: true,
      });
    default:
      return state;
  }
}

const filterById = (id : string) => (user) => user.id !== id;
const getUsersHelper = (state: IUserState) => state.users;
const getUserHelper = (state: IUserState) => state.user;
const getRoleHelper = (state: IUserState) => state.role;
const getLoadingHelper = (state: IUserState) => state.loading;
const getErrorHelper = (state: IUserState) => state.error;


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