<template>
  <div class="field-wrap">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :disabled="disabled"
      :value="modelValue"
      @input="onInput($event.target.value)"
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
    id: {
      type: String,
      required: false,
      default: "text-field",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  emits: ["update:modelValue"],
  methods: {
    onInput(value) {
      if (this.type === "tel") {
        let phone = value.replace(/\D+/g, ""); 
        phone = "+" + phone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
        this.$emit("update:modelValue", phone);
      } else {
        this.$emit("update:modelValue", value);
      }
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