<template>
  <div id="base-file-input">
    <div
      v-if="!!previousSrc && !inputValue"
      class="image-background"
      @click="selectFiles"
    >
      <img :src="previousSrc" alt="image" />
    </div>
    <div v-else-if="!!inputValue" class="image-background" @click="selectFiles">
      <img :src="currentSrc" alt="image" />
    </div>
    <div class="image-background" v-else @click="selectFiles">
      Sin archivos
    </div>
    <input
      type="file"
      :value="inputValue"
      @input="changeModelValue"
      ref="input-tag"
    />
    <div class="error" v-if="!isValid">
      <slot name="error">
        <span>El campo es inválido</span>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: false,
      default: null,
    },
    previousSrc: {
      type: String,
      required: false,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      inputValue: null,
    };
  },
  computed: {
    currentSrc() {
      return URL.createObjectURL(this.modelValue);
    },
  },
  methods: {
    changeModelValue(event) {
      if (event.target.value) {
        this.inputValue = event.target.value;
        this.$emit("update:modelValue", event.target.files[0]);
      }
    },
    selectFiles() {
      this.$refs["input-tag"].click();
    },
  },
};
</script>
<style lang="scss" scoped>
#base-file-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-background {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6rem;
  background-color: $app-primary-color;
  color: $app-secondary-font-color;
  cursor: pointer;
}

img {
  height: 100%;
}

input {
  display: none;
}

.error {
  color: $app-danger-color;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}
</style>
