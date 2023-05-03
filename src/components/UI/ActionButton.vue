<template>
  <button :disabled="disabled" class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  background: #1d2452;
  border-radius: 20px;
  padding: 8px 16px;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba($color: #283da4, $alpha: 1);
  }
}
</style>