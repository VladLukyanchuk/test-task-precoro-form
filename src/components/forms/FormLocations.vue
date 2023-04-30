<template>
  <div class="location__inputs">
    <select-item
      class="location__select"
      label="Main Location"
      :required="true"
      :options="locationOptions"
      v-model="locationsForm.mainLocation"
    />

    <simple-checkbox v-model="selectAll" title="Select All Locations" />
    <h3 class="location__title">Available Locations</h3>
    <div class="locations__available-wrapper">
      <simple-checkbox
        v-for="location in locations"
        :key="location.title"
        v-model="location.checked"
        :title="location.title"
      />
    </div>
  </div>
  <div class="location__actions">
    <action-button @click="nextPage">Next Step</action-button>
  </div>
</template>

<script>
import SimpleCheckbox from "../UI/SimpleCheckbox.vue";
export default {
  components: { SimpleCheckbox },
  data() {
    return {
      selectAll: false,
      locationsForm: {
        mainLocation: "Main Precoro US",
        availableLocations: [],
      },
      locations: [
        { title: "Berlin", checked: true },
        { title: "Poland Office", checked: false },
        { title: "Venice Office", checked: true },
        { title: "Mexico", checked: false },
        { title: "USA Office", checked: true },
        { title: "Ukraine Kiyv Lukivska 7 Main Office", checked: false },
        { title: "Canada", checked: false },
      ],
      locationOptions: ["Main Precoro US"],
    };
  },
  computed: {
    checked() {
      const checked = this.locations.filter((e) => e.checked === true);
      return checked;
    },
  },
  watch: {
    selectAll(value) {
      this.locations.forEach((item) => (item.checked = value));
    },
  },
  emits: ['save'],
  methods: {
    saveInformation() {
      this.locationsForm.availableLocations = this.checked.map((e) => e.title);
      this.$store.commit("setLocations", this.locationsForm);
    },
    nextPage() {
      this.saveInformation();
      this.$emit("save");
    },
  },
  created() {
    this.locationsForm = this.$store.getters.getLocations;
    this.locations.forEach((elem) => {
      if (this.locationsForm.availableLocations.indexOf(elem.title) != -1) {
        elem.checked = true;
      } else {
        elem.checked = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.location__inputs {
  padding: 24px;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.location__select {
  margin-bottom: 24px;
  max-width: 345px;
}

.location__title {
  margin-top: 16px;
  margin-bottom: 10px;
  color: #1d2452;
  opacity: 0.6;
}
.locations__available-wrapper {
  max-width: 500px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  row-gap: 16px;
}
@media (max-width: 450px) {
  .locations__available-wrapper {
    grid-template-columns: 1fr;
  }
}
.location__actions {
  display: flex;
  justify-content: flex-end;
  margin: 20px 24px 0 0;
}
</style>