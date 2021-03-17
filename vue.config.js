module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/scss/_reset.scss";
          @import "@/scss/_fonts.scss";
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
          @import "@/scss/_globals.scss";
        `,
      },
    },
  },
};
