module.exports = {
  // Specifies the parser to be used for TypeScript
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // Indicates the location of the TypeScript configuration file
    project: "tsconfig.json",
    // Sets the root directory for the TypeScript configuration
    tsconfigRootDir: __dirname,
    // Specifies the version of ECMAScript syntax to be used
    ecmaVersion: "latest",
    // Indicates the type of source code (script or module)
    sourceType: "module",
  },
  // Lists the ESLint plugins to be used
  plugins: ["@typescript-eslint", "prettier", "import", "unused-imports"],
  // Specifies the base configurations to extend
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "next",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
    "plugin:@next/next/recommended",
  ],
  // Specifies the patterns to be ignored by ESLint
  ignorePatterns: [".eslintrc.js", ".stories.tsx"],
  rules: {
    // Configures the Prettier integration with ESLint
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    // Disables the rule requiring an 'I' prefix for interfaces
    "@typescript-eslint/interface-name-prefix": "off",
    // Configures the naming conventions for various code constructs
    "@typescript-eslint/naming-convention": [
      // ... various naming convention configurations ...
      "error",
      // Allows any naming format for destructured variables
      {
        selector: "variable",
        modifiers: ["destructured"],
        format: null,
      },
      // Requires strict camelCase for function names
      {
        selector: "function",
        format: ["strictCamelCase"],
      },
      // Requires boolean variables to have one of the specified prefixes
      {
        selector: "variable",
        format: null,
        types: ["boolean"],
        prefix: ["is", "should", "has", "can", "did", "will"],
      },
      // Requires interface names to have a strict PascalCase format and an 'I' prefix
      {
        selector: "interface",
        format: ["StrictPascalCase"],
        prefix: ["I"],
      },
      // Requires enum names to have a strict PascalCase format
      {
        selector: "enum",
        format: ["StrictPascalCase"],
      },
    ],
    // Disables the rule requiring explicit return types for functions
    "@typescript-eslint/explicit-function-return-type": "off",
    // Disables the rule requiring explicit boundary types for modules
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // Disables the rule prohibiting the use of 'any' type
    "@typescript-eslint/no-explicit-any": "off",
    // Disables the rule detecting unused variables
    "no-unused-vars": 0,
    // Disables the rule disallowing named exports used as a default export
    "import/no-named-as-default": 0,
    // Disables the TypeScript-specific rule detecting unused variables
    "@typescript-eslint/no-unused-vars": 0,
    // Enables the rule detecting unused imports
    "unused-imports/no-unused-imports": 1,
    // Configures the rule detecting unused variables and imports
    "unused-imports/no-unused-vars": [
      // ... unused variables and imports configuration ...
      "error",
      {
        // Apply the rule to all variables
        vars: "all",
        // Do not apply the rule to function arguments
        args: "none",
        // Ignore the rest siblings of a destructured object
        ignoreRestSiblings: true,
      },
    ],
    // Configures the order and formatting of import statements
    "import/order": [
      // ... import order configuration ...
      "error",
      {
        // Configure the alphabetization settings
        alphabetize: {
          // Enforce ascending alphabetical order
          order: "asc",
          // Do not ignore the case while sorting
          caseInsensitive: false,
        },
        // Enforce newlines between different groups and inside groups of imports
        "newlines-between": "always-and-inside-groups",
        // Warn when there is an import statement that is not part of any group
        warnOnUnassignedImports: true,
      },
    ],
    // Disables the rule requiring prop types for React components
    "react/prop-types": "off",
    // Configures the rule detecting extraneous dependencies
    "import/no-extraneous-dependencies": [
      // ... extraneous dependencies configuration ...
      "error",
      {
        // Specify the file patterns where devDependencies imports are allowed
        devDependencies: [
          // Allow devDependencies imports in test and spec files
          "**/*.test.{ts,js}",
          "**/*.spec.{ts,js}",
          // Allow devDependencies imports in the 'test' folder
          "./test/**.{ts,js}",
          // Allow devDependencies imports in the 'scripts' folder
          "./scripts/**/*.{ts,js}",
        ],
      },
    ],
  },
};
