import { createStore } from "vuex";

export default createStore({
  state: {
    form: {
      main: {
        firstName: "Mark",
        lastName: "Magura",
        email: "maguramarkian@precoro.com",
        phone: "+380992343823",
        position: "Developer",
        activeInAllCompanies: true,
        company: "Precoro",
      },
      locations: {
        mainLocation: "Main Precoro US",
        availableLocations: [],
      },
      roles: {
        access: {},
        management: {},
        admin: false,
      },
    },
  },
  getters: {
    getMain(state) {
      return state.form.main;
    },
    getLocations(state) {
      return state.form.locations;
    },
    getRoles(state) {
      return state.form.roles;
    },
  },
  mutations: {
    setMain(state, obj) {
      state.form.main = obj;
    },
    setLocations(state, obj) {
      state.form.locations = obj;
    },
    setRoles(state, obj) {
      state.form.roles = obj;
    },
  },
  actions: {},
  modules: {},
});
