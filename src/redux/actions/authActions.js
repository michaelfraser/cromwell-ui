export const LOGOUT = "LOGOUT";


// export const logout = () => (dispatch) => {
//   // Optionally clear tokens or local storage here
//   localStorage.removeItem("authToken");
//   dispatch({ type: LOGOUT });
// };


export const logout = () => {
  return {
    type: LOGOUT,
  };
};
