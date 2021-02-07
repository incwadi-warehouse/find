<template>
  <b-actionbar>
    <template #input>
      <b-search
        :placeholder="$t('search.search_in_title_author')"
        icon
        @input="change"
        @submit.prevent="find"
        @reset="reset"
        v-model="term"
      />
    </template>
  </b-actionbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'search-actionbar',
  computed: {
    term: {
      get: function () {
        return this.$store.state.search.term
      },
      set: function (term) {
        this.$store.commit('search/term', term)
      },
    },
  },
  methods: {
    ...mapActions('search', ['find']),
    reset() {
      this.$store.commit('search/books', [])
    },
    change() {
      if (this.term === null) return
      this.$store.dispatch('search/find')
    },
  },
}
</script>
