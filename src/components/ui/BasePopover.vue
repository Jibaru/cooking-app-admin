<template>
  <div class="popover" v-show="open" :style="popoverStyles" ref="popover">
    <slot></slot>
  </div>
</template>
<script>
const TARGET_CLASS_NAME = "popover-target";

export default {
  emits: ["click-outside"],
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    targetDataId: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "bottom",
      validator(val) {
        const locations = ["top", "bottom", "right", "left"];
        return locations.find((location) => location !== val);
      },
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      top: null,
      left: null,
      right: null,
      bottom: null,
    };
  },
  computed: {
    popoverStyles() {
      return {
        ...(this.top && {
          top: `${this.top}px`,
        }),
        ...(this.left && {
          left: `${this.left}px`,
        }),
        ...(this.right && {
          right: `${this.right}px`,
        }),
        ...(this.bottom && {
          bottom: `${this.bottom}px`,
        }),
        ...(this.noPadding && {
          padding: 0,
        }),
      };
    },
  },
  methods: {
    getTargetElement() {
      return document.querySelector(
        `.${TARGET_CLASS_NAME}[data-id="${this.targetDataId}"]`
      );
    },
    existsTargetElement() {
      return !!this.getTargetElement();
    },
    setLocationFromTargetElement() {
      if (!this.existsTargetElement()) {
        return console.warn("Target element does not exists");
      }
      this.setBoundaries();
    },
    setBoundaries() {
      const targetBCRect = this.getTargetElement().getBoundingClientRect();
      const documentHeight = document.documentElement.clientHeight;
      const documentWidth = document.documentElement.clientWidth;

      switch (this.location) {
        case "top":
          this.bottom =
            documentHeight - targetBCRect.bottom + targetBCRect.height;
          this.left = targetBCRect.left;
          break;
        case "bottom":
          this.top = targetBCRect.top + targetBCRect.height;
          this.left = targetBCRect.left;
          break;
        case "right":
          this.top = targetBCRect.top;
          this.left = targetBCRect.left + targetBCRect.width;
          break;
        case "left":
          this.top = targetBCRect.top;
          this.right = documentWidth - targetBCRect.right + targetBCRect.width;
          break;
      }
    },
    handleClickOutside(event) {
      if (
        this.open &&
        event.target !== this.getTargetElement() &&
        !this.$refs["popover"]?.contains(event.target)
      ) {
        this.$emit("click-outside");
      }
    },
  },
  created() {
    window.addEventListener("resize", this.setLocationFromTargetElement);
    window.addEventListener("scroll", this.setLocationFromTargetElement);
    window.addEventListener("click", this.handleClickOutside);
  },
  mounted() {
    this.$nextTick(() => {
      this.setLocationFromTargetElement();
    });
  },
  unmounted() {
    window.removeEventListener("resize", this.setLocationFromTargetElement);
    window.removeEventListener("scroll", this.setLocationFromTargetElement);
    window.removeEventListener("click", this.handleClickOutside);
  },
};
</script>
<style lang="scss" scoped>
$popover-width: 10rem;

.popover {
  @include low-shadow;
  position: fixed;
  z-index: 99;
  background-color: white;
  padding: 1rem;
  width: $popover-width;
}
</style>
