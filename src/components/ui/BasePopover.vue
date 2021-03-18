<template>
  <div class="popover" v-show="open" :style="popoverStyles">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    targetRef: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      top: 0,
      left: 0,
    };
  },
  computed: {
    popoverStyles() {
      return {
        top: `${this.top}px`,
        left: `${this.left}px`,
      };
    },
  },
  methods: {
    getTargetElement() {
      return this.$parent.$refs[this.targetRef];
    },
    existsTargetElement() {
      return (
        this.getTargetElement() &&
        Object.prototype.hasOwnProperty.call(
          this.getTargetElement(),
          "getBoundingClientRect"
        )
      );
    },
    setLocationFromTargetElement() {
      const targetElement = this.getTargetElement();

      if (!this.existsTargetElement()) {
        return console.warn(
          "Target Ref doesn't contains a getBoundingClientRect method"
        );
      }

      const targetBoundingClientRect = targetElement.getBoundingClientRect();

      if (!(targetBoundingClientRect instanceof DOMRect)) {
        return console.warn(
          "The getBoundingClientRect method doesn't returns a DOMRect object"
        );
      }

      this.top =
        targetBoundingClientRect.top + targetBoundingClientRect.height + 10;
      this.left = targetBoundingClientRect.left;
    },
  },
  created() {
    window.addEventListener("resize", this.setLocationFromTargetElement);
  },
  mounted() {
    this.setLocationFromTargetElement();
  },
  unmounted() {
    window.removeEventListener("resize", this.setLocationFromTargetElement);
  },
};
</script>
<style lang="scss" scoped>
$popover-width: 10rem;

.popover {
  @include low-shadow;
  position: absolute;
  z-index: 99;
  background-color: white;
  padding: 1rem;
  width: $popover-width;

  &:after {
    content: "";
    position: absolute;
    left: 10px;
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    clear: both;
  }
}
</style>
