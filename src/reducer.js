const { initialState } = require("./store");

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH/LOGIN":
      return {
        ...state,
        username: action.payload.username,
      };
    default:
      return state;
  }
};
