<template>
  <b-actionbar>
    <template #input>
      <b-search
        :placeholder="$t('searchInTitleAuthor')"
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
import _debounce from 'lodash/debounce'

export default {
  name: 'search-actionbar',
  data() {
    return {
      changeRequest: null,
    }
  },
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
      if (null !== this.changeRequest) {
        this.changeRequest.cancel()
      }
      this.changeRequest = _debounce(() => {
        if (this.term === null) return
        this.$store.dispatch('search/find')
      }, 500)
      this.changeRequest()
    },
  },
}
</script>
