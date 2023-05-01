<template>
  <div class="field-wrap">
    <label for="name">{{ label }}</label>
    <input
      id="name"
      :type="type"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="field"
    />
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
    type: {
      type: String,
      required: false,
      default: "text",
    },
  },
  computed: {
    disabled() {
      return this.$store.getters.getFormStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
.field-wrap {
  max-width: 345px;
  label {
    font-size: 12px;
    color: rgba(29, 36, 82, 0.5);
  }
}
.field {
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