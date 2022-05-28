<script>
import Logo from './components/Logo.vue'
import Cart from '@/components/Cart.vue'

export default {
  name: 'app',
  components: {
    Logo,
    Cart,
  },
  head: {
    title: 'Home',
  },
  setup() {
    const about = process.env.VUE_APP_ABOUT
    const hasLogo = process.env.VUE_APP_LOGO === 'false' ? false : true

    return { about, hasLogo }
  },
}
</script>

<template>
  <b-app>
    <b-masthead>
      <b-masthead-item type="center">
        <router-link :to="{ name: 'index' }">
          <logo v-if="hasLogo" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 200 200"
            class="logo"
            v-else
          >
            <path
              d="M 27.435547 9.8710938 C 17.706307 9.8710935 9.8710935 17.706307 9.8710938 27.435547 L 9.8710938 172.56445 C 9.8710935 182.29369 17.706307 190.12891 27.435547 190.12891 L 172.56445 190.12891 C 182.29369 190.12891 190.12891 182.29369 190.12891 172.56445 L 190.12891 27.435547 C 190.12891 17.706307 182.29369 9.8710938 172.56445 9.8710938 L 27.435547 9.8710938 z M 55 40 L 145 40 L 145 160 L 100 124 L 55 160 L 55 40 z "
            />
          </svg>
        </router-link>
      </b-masthead-item>

      <b-masthead-item type="end">
        <cart />
      </b-masthead-item>
    </b-masthead>

    <router-view />

    <b-container size="m">
      <div v-html="about" />
    </b-container>
  </b-app>
</template>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
</style>
