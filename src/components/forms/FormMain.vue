<template>
  <div class="main__wrapper">
    <div class="main__inputs">
      <text-field
        type="text"
        label="First Name"
        v-model="mainForm.firstName"
        id="firstName"
      />
      <text-field
        type="text"
        label="Last Name"
        v-model="mainForm.lastName"
        id="firstName"
      />
      <text-field
        type="email"
        label="Email Address"
        v-model="mainForm.email"
        id="email"
      />
      <text-field
        type="tel"
        label="Phone Number"
        v-model="mainForm.phone"
        id="phone"
      />
      <text-field
        type="text"
        label="Position"
        v-model="mainForm.position"
        id="position"
      />
      <select-item
        label="Available in company"
        :options="companyOptions"
        v-model="mainForm.company"
      />
    </div>
  </div>
  <div class="main__actions">
    <div class="main__switch">
      <switch-checkbox
        v-model="mainForm.activeInAllCompanies"
        label="Active in all companies"
      />
      <infoIcon/>
    </div>
    <action-button class="main__btn" @click="nextPage">Next Step</action-button>
  </div>
</template>

<script>
import infoIcon from "@/assets/svg/infoIcon.vue"

export default {
  components: { infoIcon},
  data() {
    return {
      mainForm: {},
      companyOptions: ["Precoro", "Another company 1", "Another company 2"],
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