<template>
  <b-container size="l" v-if="hasBooks">
    <div class="search-head">
      <div class="search-head_title">
        <h2>{{ $t('search.books') }}</h2>
        <span v-if="counter >= 2 && counter !== books.length">
          {{
            $t('search.show_x_of_y_found_books', {
              show: books.length,
              found: counter,
            })
          }}
        </span>
        <span v-if="counter >= 2 && counter === books.length">
          {{
            $t('search.show_x_found_books', {
              found: counter,
            })
          }}
        </span>
        <span v-if="counter === 1 && counter === books.length">
          {{ $t('search.show_1_found_book') }}
        </span>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'book-counter-search',
  computed: {
    ...mapState('search', ['books']),
    counter() {
      return this.$store.state.search.counter
    },
    hasBooks() {
      return this.$store.state.search.counter >= 1
    },
  },
}
</script>

<style scoped>
.search-head {
  display: flex;
  align-items: center;
}
.search-head_title {
  flex-grow: 1;
}
</style>
