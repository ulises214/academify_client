module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "eslint-config-codely/typescript",
  ],
  ignorePatterns: [".eslintrc.cjs", "tailwind.config.js", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react-refresh", "react-hooks", "tailwindcss", "import"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "warn",
    "tailwindcss/no-contradicting-classname": "error",
    "import/no-unresolved": "error",
    "prettier/prettier": [
      "error",
      {
        usePrettierrc: "true",
      },
    ],
  },
};
