module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-typescript", { allowDeclareFields: true }],
  ],

  // required for easily mocking module exports.
  // see: https://stackoverflow.com/questions/67872622/jest-spyon-not-working-on-index-file-cannot-redefine-property
  assumptions: {
    constantReexports: true,
  },
  plugins: [
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]
  ],
};
