<template>
  <b-app id="app">
    <heading />
    <b-content>
      <router-view />
    </b-content>
  </b-app>
</template>

<script>
import Heading from './components/Heading'

export default {
  name: 'app',
  head: {
    title: 'Home',
    titleTemplate: '%s - incwadi',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'incwadi is a book database to manage your books.',
      },
      {
        vmid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
      {
        vmid: 'charset',
        charset: 'utf-8',
      },
    ],
  },
  components: {
    Heading,
  },
  mounted: function () {
    const el = document.querySelector('html')
    el.style.setProperty(
      '--color-primary-10',
      process.env.COLOR10 !== 'false' ? process.env.COLOR10 : '#d7621d'
    )
    el.style.setProperty(
      '--color-primary-05',
      process.env.COLOR05 !== 'false' ? process.env.COLOR05 : '#e9915d'
    )
    el.style.setProperty(
      '--color-primary-00',
      process.env.COLOR00 !== 'false' ? process.env.COLOR00 : '#f3c2a5'
    )
    this.$i18n.locale =
      window.localStorage.getItem('locale') || process.env.LOCALE
  },
}
</script>

<style src="@baldeweg/components/dist/components.css" />

<style>
html {
  --masthead-height: 66px;
}
</style>
