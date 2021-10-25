module.exports = {
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local',
    },
    name: 'incwadi',
    themeColor: '#d7621d',
  },
  pluginOptions: {
    components: {
      title: 'incwadi',
      needsAuth: false,
    },
    i18n: {
      locale: 'de-DE',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
