// store/auth.js
export const state = () => ({
    loggedIn: false,
  });
  
  export const mutations = {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
  };
  
export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },
    loggedInUser(state) {
        return state.auth.user
    },
}