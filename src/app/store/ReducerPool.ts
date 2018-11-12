export class ReducerPool {
  reducers
  constructor () {
    this.reducers = [];
  }
  registerReducer (reducer) {
    this.reducers.push(reducer);
  }
  getNewState (state, action) {
    return this.reducers.reduce((state, reducer) => {
      return reducer.getNewState(state, action);
    }, state);
  }
}