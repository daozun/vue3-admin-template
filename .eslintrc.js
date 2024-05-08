module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["plugin:vue-libs/recommended"],

  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-plugin-vue-libs
  rules: {
    "vue/multi-word-component-names": "off",
    "no-undef": 0,
    quotes: 0,
    "comma-dangle": 0,
    semi: 0,
    "space-before-function-paren": 0,
  },
};
