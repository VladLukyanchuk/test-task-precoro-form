<template>
  <div class="location__inputs">
    <select-item
      class="location__select"
      label="Main Location"
      :required="true"
      :options="locationOptions"
      v-model="locationsForm.mainLocation"
    />

    <simple-checkbox
      @update:modelValue="updateSelectedLocations"
      :modelValue="selectAll"
      label="Select All Locations"
    />
    <h3 class="location__title">Available Locations</h3>
    <div class="locations__available-wrapper">
      <simple-checkbox
        v-for="location in locations"
        :key="location"
        :value="location"
        v-model="locationsForm.availableLocations"
        :label="location"
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
      locationsForm: {
        mainLocation: "Main Precoro US",
        availableLocations: [],
      },
      locations: [
        "Berlin",
        "Poland Office",
        "Venice Office",
        "Mexico",
        "USA Office",
        "Ukraine Kiyv Lukivska 7 Main Office",
        "Canada",
      ],
      locationOptions: ["Main Precoro US", "Another location 1", "Another location 2"],
    };
  },
  computed: {
    selectAll() {
      return (
        this.locations.length === this.locationsForm.availableLocations.length
      );
    },
  },
  emits: ["save"],
  methods: {
    updateSelectedLocations(value) {
      this.locationsForm.availableLocations = value ? [...this.locations] : [];
    },
    saveInformation() {
      this.$store.commit("setLocations", this.locationsForm);
    },
    nextPage() {
      this.saveInformation();
      this.$emit("save");
    },
  },
  created() {
    this.locationsForm = this.$store.getters.getLocations;
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