module.exports = {
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local',
    },
    name: 'incwadi',
    themeColor: '#d7621d',
  },
  pluginOptions: {
    i18n: {
      locale: 'de-DE',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  publicPath: process.env.VUE_APP_BASE_URL,
}
