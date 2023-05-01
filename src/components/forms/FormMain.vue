<template>
  <div class="main__wrapper">
    <div class="main__inputs">
      <text-field type="text" label="First Name" v-model="mainForm.firstName" />
      <text-field type="text" label="Last Name" v-model="mainForm.lastName" />
      <text-field type="email" label="Email Address" v-model="mainForm.email" />
      <text-field type="tel" label="Phone Number" v-model="mainForm.phone" />
      <text-field type="text" label="Position" v-model="mainForm.position" />
      <select-item
        label="Available in company"
        :options="companyOptions"
        v-model="mainForm.company"
      />
    </div>
  </div>
  <div class="main__actions">
    <div class="main__switch">
      <switch-checkbox v-model="mainForm.activeInAllCompanies" />
      <div class="main__switch-description">Active in all companies</div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 1.75C5.44321 1.75 1.75 5.44321 1.75 10C1.75 14.5568 5.44321 18.25 10 18.25C14.5568 18.25 18.25 14.5568 18.25 10C18.25 5.44321 14.5568 1.75 10 1.75ZM0.25 10C0.25 4.61479 4.61479 0.25 10 0.25C15.3852 0.25 19.75 4.61479 19.75 10C19.75 15.3852 15.3852 19.75 10 19.75C4.61479 19.75 0.25 15.3852 0.25 10ZM10 5.25C10.4142 5.25 10.75 5.58579 10.75 6V7C10.75 7.41421 10.4142 7.75 10 7.75C9.58579 7.75 9.25 7.41421 9.25 7V6C9.25 5.58579 9.58579 5.25 10 5.25ZM10 9.25C10.4142 9.25 10.75 9.58579 10.75 10V15C10.75 15.4142 10.4142 15.75 10 15.75C9.58579 15.75 9.25 15.4142 9.25 15V10C9.25 9.58579 9.58579 9.25 10 9.25Z"
          fill="#1D2452"
        />
      </svg>
    </div>
    <action-button class="main__btn" @click="nextPage">Next Step</action-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainForm: {},
      companyOptions: ["Precoro"],
    };
  },
  emits: ["save"],
  methods: {
    saveInformation() {
      this.$store.commit("setMain", this.mainForm);
    },
    nextPage() {
      this.saveInformation();
      this.$emit("save");
    },
  },
  created() {
    this.mainForm = this.$store.getters.getMain;
  },
};
</script>

<style lang="scss" scoped>
.main__wrapper {
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  padding: 24px 24px 32px 24px;
}
.main__inputs {
  max-width: 710px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 20px;
}
.main__actions {
  display: flex;
  justify-content: space-between;
  margin: 20px 24px 0 24px;
}
.main__switch {
  display: flex;
  align-items: center;
  svg {
    flex-shrink: 0;
    opacity: 0.5;
    margin-left: 6px;
  }
}
.main__switch-description {
  margin-left: 8px;
}

@media (max-width: 415px) {
  .main__actions {
    flex-direction: column;
    align-items: center;
    .main__switch {
      margin-bottom: 20px;
      align-self: flex-start;
    }
    .main__btn {
      align-self: flex-end;
    }
  }
}
</style>