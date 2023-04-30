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
        access: {
          "Warehouse requests": [],
          "Purchase requests": ["View only"],
          "Request for proposals": ["View only"],
          "Purchase orders": ["View only"],
          Receipts: ["View only"],
          Invoices: ["View only"],
          Expenses: ["View only"],
        },
        management: [],
        admin: false,
      },
    },
    formSent: false,
  },
  getters: {
    getForm(state) {
      return state.form;
    },
    getMain(state) {
      return state.form.main;
    },
    getLocations(state) {
      return state.form.locations;
    },
    getRoles(state) {
      return state.form.roles;
    },
    getFormStatus(state) {
      return state.formSent;
    }
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
    setFormStatus(state, status) {
      state.formSent = status;
      console.log('vuex', state.formSent)
    },
  },
  actions: {},
  modules: {},
});
