module.exports = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  importOrder: ['^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: '*.{json,css,scss}',
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
};
