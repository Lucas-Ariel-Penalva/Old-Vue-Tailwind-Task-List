module.exports = {
  plugins: [
    require("tailwindcss"),
    process.env.NODE_ENV === "production" &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./src/App.vue", "./public/index.html"],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        whitelistPatterns: [
          /enter$/,
          /enter-to$/,
          /leave$/,
          /leave-to$/,
          /leave-active$/,
          /enter-active$/,
          /move$/
        ]
      })
  ]
};
