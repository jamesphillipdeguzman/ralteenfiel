// eslint.config.js
export default [
  {
    files: ["*.js", "src/**/*.js"], // Define which files ESLint should lint
    rules: {
      "no-console": "warn",
      semi: ["error", "always"],
    },
  },
];
