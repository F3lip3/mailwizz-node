module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@entities': './src/entities',
          '@models': './src/models',
          '@modules': './src/modules',
          '@utils': './src/utils'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
};
