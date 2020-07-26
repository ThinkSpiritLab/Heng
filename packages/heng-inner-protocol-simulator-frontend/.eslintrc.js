/* eslint-env node */
module.exports = {
    root: true,
    // parser: "@typescript-eslint/parser",
    plugins: [
        // "@typescript-eslint",
    ],
    extends: [
        "plugin:vue/essential",
        "plugin:prettier/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "eslint:recommended",
        "plugin:vue/base",
        "prettier",
    ],
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        // "no-unused-vars": "off",
        // "@typescript-eslint/no-unused-vars": ["warn"]
    },
};
