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
      <div class="checkmark">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.82918 7.73564C3.73372 7.83166 3.60349 7.88523 3.46821 7.88523C3.33292 7.88523 3.20269 7.83166 3.10723 7.73564L0.224383 4.85232C-0.0747942 4.55315 -0.0747942 4.06801 0.224383 3.7694L0.585358 3.40833C0.884628 3.10915 1.3692 3.10915 1.66838 3.40833L3.46821 5.20825L8.3316 0.344759C8.63087 0.0455824 9.11591 0.0455824 9.41462 0.344759L9.7756 0.705828C10.0748 1.005 10.0748 1.49004 9.7756 1.78875L3.82918 7.73564Z"
            fill="white"
          />
        </svg>
      </div>
    </label>
    <span v-if="title" class="checkbox__title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      required: false,
    },
    title: {
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
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.includes(this.value);
      } else {
        return this.modelValue;
      }
    },
    disabled() {
      return this.$store.getters.getFormStatus
    }
  },
  methods: {
    updateValue(value, checked) {
      if (Array.isArray(this.modelValue)) {
        const newValue = [...this.modelValue];
        if (checked) {
          newValue.push(value);
        } else {
          const index = newValue.indexOf(value);
          newValue.splice(index, 1);
        }
        this.$emit("update:modelValue", newValue);
      } else {
        this.$emit("update:modelValue", checked);
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
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
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