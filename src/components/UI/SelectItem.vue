<template>
  <div class="select-wrap">
    <label for="select">{{ label }} <span v-if="required">*</span></label>
    <select
      id="select"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="select"
      :disabled="disabled"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.75593 5.12713C5.35716 5.58759 4.64284 5.58759 4.24407 5.12713L1.23682 1.65465C0.675944 1.00701 1.136 0 1.99275 0L8.00725 0C8.864 0 9.32406 1.00701 8.76318 1.65465L5.75593 5.12713Z"
        fill="#1D2452"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      default: "",
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
};
</script>

<style lang="scss" scoped>
.select-wrap {
  position: relative;
  label {
    font-size: 12px;
    color: rgba(29, 36, 82, 0.5);
  }
  svg {
    position: absolute;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
  }
  span {
    color: #f5455a;
  }
}

.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #ffffff;
  border: 1px solid rgba(29, 36, 82, 0.1);
  border-radius: 8px;
  height: 40px;
  width: 100%;
  padding: 9px 8px;
  margin-top: 4px;
  font-weight: 500;
  font-size: 16px;
  &:focus,
  &:hover {
    outline: none;
    border: 1px solid rgba(29, 36, 82, 0.2);
  }
}
</style>