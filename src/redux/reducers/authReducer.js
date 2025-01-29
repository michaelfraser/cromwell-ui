import { LOGOUT } from "../actions/authActions";

const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"), // Check token existence on initialization
};

export default function authReducer(state = initialState, action) {
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