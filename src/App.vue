<template>
  <b-app id="app">
    <heading />

    <b-content>
      <router-view />

      <b-container size="m">
        <div v-html="about" />
      </b-container>
    </b-content>
  </b-app>
</template>

<script>
import Heading from './components/Heading'

export default {
  name: 'app',
  components: {
    Heading,
  },
  head: {
    title: 'Home',
    titleTemplate: '%s - incwadi',
  },
  computed: {
    about() {
      return process.env.VUE_APP_ABOUT
    },
  },
}
</script>
