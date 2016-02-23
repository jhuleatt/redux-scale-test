/* @flow */
import R from 'ramda';

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const MAKE_BIG_JSON_BLOB = 'MAKE_BIG_JSON_BLOB';

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
export const increment = (value: number = 1): Action => ({
  type: COUNTER_INCREMENT,
  payload: value
});

export const makeBigJSONBlob = (): Action => ({
  type: MAKE_BIG_JSON_BLOB
});

export const actions = {
  increment
};

function addChildren (n) {
  let obj = {};

  if (n === 0) {
    obj.prop = 'The text';
  } else {
    for (var i = 0; i < 100; i++) {
      obj[i] = addChildren(n-1);
    }
  }

  return obj;
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state: Object, action: {payload: number}): Object => {
    const newState = Object.assign({}, state);//R.clone(state);
    newState.count += action.payload;
    console.log(newState.count);
    return newState;
  },
  [MAKE_BIG_JSON_BLOB]: (state: Object, action): Object => {
    const newState = R.clone(state);
    newState.bigBlob = addChildren(3);
    console.log(newState.bigBlob);
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  count: 0
};
export default function counterReducer (state: Object = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
