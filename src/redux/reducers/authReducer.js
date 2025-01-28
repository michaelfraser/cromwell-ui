import { LOGOUT } from "../actions/authActions";

const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"), // Check token existence on initialization
};

console.log('initialState=' + initialState.isAuthenticated);

export default function authReducer(state = initialState, action) {
  console.log("Action received in authReducer:", action);
  console.log('initialState2=' + initialState.isAuthenticated);

  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};