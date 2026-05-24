import { createStore } from "redux";

/**
 * Initial application state
 */
const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  theme: "light",
};

/**
 * Root reducer function that handles all state changes
 *
 * @param {Object} state - Current state
 * @param {Object} action - Action object
 * @returns {Object} New state
 */
const changeState = (state = initialState, action) => {
  switch (action.type) {
    case "set":
      return { ...state, ...action };
    default:
      return state;
  }
};

/**
 * Redux store instance
 */
const store = createStore(changeState);

export default store;