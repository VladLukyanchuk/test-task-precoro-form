import { createStore } from "vuex";

export default createStore({
  state: {
    form: {
      main: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        activeInAllCompanies: true,
        company: "",
      },
      locations: {
        mainLocation: "",
        availableLocations: [],
      },
      roles: {
        access: {
          "Warehouse requests": [],
          "Purchase requests": [],
          "Request for proposals": [],
          "Purchase orders": [],
          Receipts: [],
          Invoices: [],
          Expenses: [],
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
    },
  },
  actions: {},
  modules: {},
});
