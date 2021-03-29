<template>
  <article>
    <b-container size="m">
      <search-actionbar />
    </b-container>

    <b-container size="m" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="hasBooks">
      <search-books-list @book="setBook" />
    </b-container>

    <b-container size="m" v-if="pages > 1">
      <ul class="pagination">
        <li class="pagination_info">
          {{ $t('search.page') }} {{ currentPage }} / {{ pages }}
        </li>
        <li
          class="pagination_item"
          v-for="page in pages"
          :key="page"
          @click="setPage(page)"
        >
          {{ page }}
        </li>
      </ul>
    </b-container>

    <search-book-show :book="book" v-if="book" @close="book = null" />
  </article>
</template>

<script>
import SearchActionbar from '../components/search/Actionbar'
import SearchBookShow from '../components/search/BookShow'
import SearchBooksList from '../components/search/BooksList'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchActionbar,
    SearchBookShow,
    SearchBooksList,
  },
  data() {
    return {
      book: null,
    }
  },
  computed: {
    hasBooks() {
      if (!this.$store.state.search.books) return false
      return this.$store.state.search.books.length >= 1
    },
    isLoading() {
      return this.$store.state.search.isLoading
    },
    currentPage() {
      return this.$store.state.search.page
    },
    pages() {
      return this.$store.state.search.pages
    },
  },
  methods: {
    setBook(book) {
      this.book = book
    },
    setPage(page) {
      this.$store.commit('search/page', page)
      this.$store.dispatch('search/find')
    },
  },
}
</script>

<style scoped>
.pagination {
  list-style: none;
  padding: 0;
  margin: 0;
}
.pagination_info {
  float: left;
  padding: 10px 10px 10px 0;
  margin: 10px 10px 10px 0;
}
.pagination_item {
  float: left;
  border: 1px solid var(--color-neutral-02);
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}
.pagination_item:hover {
  border: 1px solid var(--color-primary-10);
}
</style>
