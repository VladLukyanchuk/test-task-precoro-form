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
    },
  },
  getters: {
    getMain(state) {
      return state.form.main;
    },
    getLocations(state) {
      return state.form.locations;
    },
  },
  mutations: {
    setMain(state, obj) {
      state.form.main = obj;
    },
    setLocations(state, obj) {
      state.form.locations = obj;
    },
  },
  actions: {},
  modules: {},
});
