<template>
  <label class="checkbox__wrap">
    <div class="checkbox">
      <input
        class="checkbox__input"
        :disabled="disabled"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        id="check"
        type="checkbox"
      />
      <label for="check"></label>
    </div>

    <span v-if="label" class="checkbox__title">{{ label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: true,
    },
    label: {
      type: String,
      required: false,
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
@import "@/style/helpers/vars.scss";
.checkbox__wrap {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.checkbox {
  position: relative;
  width: 44px;
  height: 24px;
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 44px;
    height: 24px;
    border-radius: 50px;
    background: rgba($color: #5e6a75, $alpha: 0.1);
    transition: all 0.3s ease;
  }
  .checkbox__content {
    position: absolute;
    top: 0;
    right: -10px;
  }
}

.checkbox label:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.3s ease;
}

.checkbox input[type="checkbox"]:checked + label {
  background-color: $accent-color;
}

.checkbox input[type="checkbox"]:checked + label:after {
  transform: translateX(20px);
}

.checkbox__input {
  display: none;
}
.checkbox__title {
  margin-left: 8px;
}
</style>