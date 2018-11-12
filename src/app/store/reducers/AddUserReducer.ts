import { BaseReducer } from "../BaseReducer";
import { ADD_USER } from "../contants";
import { ReducerPool } from "../ReducerPool";

export class AddUserReducer implements BaseReducer {
  getNewState(state, action) {
    if (action.type === ADD_USER) {
      return [
        {
          id : 1
        }
      ]
    } else {
      return state;
    }
  }
}

//ReducerPool.