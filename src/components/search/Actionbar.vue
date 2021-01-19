<template>
  <b-actionbar>
    <template #input>
      <b-search
        :placeholder="$t('search_in_title_author')"
        icon
        @input="change"
        @submit.prevent="search"
        @reset="reset"
        v-model="term"
      />
    </template>
  </b-actionbar>
</template>

<script>
export default {
  name: 'search-search',
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
    search() {
      this.$store.dispatch('book/find')
    },
    reset() {
      this.$store.commit('book/books', [])
    },
    change() {
      if (this.term === null) return
      this.$store.dispatch('book/find')
    },
  },
}
</script>
