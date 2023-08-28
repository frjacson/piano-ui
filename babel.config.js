module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'piano-ui',
        libraryDirectory: 'components',
        customName: name => {
          if (name === 'hooks') {
            return 'piano-ui/hooks/index'
          }
          return `piano-ui/components/${name}`
        },
        style: false // 此文先不考虑样式的拆分
      }
    ]
  ]
}
