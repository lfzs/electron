const { packager } = require('@electron/packager')

;(async () => {
  await packager({
    dir: './dist',
    out: './out',
    name: 'cx',
    overwrite: true,
    icon: './src/static/mac.icns'
  })
})()