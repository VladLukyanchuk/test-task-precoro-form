<template>
  <div class="checkbox__wrap">
    <label class="container">
      <input
        :checked="isChecked"
        :disabled="disabled"
        :value="value"
        :id="value"
        @change="updateValue($event.target.value, $event.target.checked)"
        type="checkbox"
      />
      <span class="checkmark">
        <checkBoxIcon/>
      </span>
      <span v-bind="$attrs" v-if="label" class="checkbox__title">{{
        label
      }}</span>
    </label>
  </div>
</template>

<script>
import checkBoxIcon from '@/assets/svg/checkBoxIcon.vue';

export default {
  components: { checkBoxIcon},
  props: {
    modelValue: {
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  computed: {
    isChecked() {
      if (this.isArray) {
        return this.modelValue.includes(this.value);
      } else {
        return this.modelValue;
      }
    },
    isArray() {
      return Array.isArray(this.modelValue)
    },
    disabled() {
      return this.$store.getters.getFormStatus;
    },
  },
  methods: {
    updateValue(value, checked) {
      if (this.isArray) {
        const newValue = [...this.modelValue];
        if (checked) {
          newValue.push(value);
        } else {
          const index = newValue.indexOf(value);
          newValue.splice(index, 1);
        }
        this.$emit("update:modelValue", newValue);
      } else {
        this.$emit("update:modelValue", checked, this.value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/helpers/vars.scss";
.checkbox__wrap {
  display: flex;
  align-items: center;
}
.checkbox__title {
  margin-left: 8px;
}

.container {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
}

/* Create a custom checkbox */
.checkmark {
  position: relative;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  border: 1px solid rgba(29, 36, 82, 0.1);
  border-radius: 4px;
  transition: all 0.2s linear;
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: $accent-color;
  border: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}
</style>