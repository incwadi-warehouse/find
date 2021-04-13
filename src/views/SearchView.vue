<template>
  <article>
    <b-container size="m">
      <search-actionbar
        v-model="state.term"
        @find="find"
        @reset="state.books = []"
      />
    </b-container>

    <b-container size="m" v-if="state.isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="hasBooks">
      <search-books-list :books="state.books" @book="setBook" />
    </b-container>

    <b-container size="m" v-if="state.pages > 1">
      <ul class="pagination">
        <li class="pagination_info">
          {{ $t('page') }} {{ state.page }} / {{ state.pages }}
        </li>
        <li
          class="pagination_item"
          v-for="page in state.pages"
          :key="page"
          @click="setPage(page)"
        >
          {{ page }}
        </li>
      </ul>
    </b-container>

    <search-book-show
      :book="state.book"
      v-if="state.book"
      @close="state.book = null"
    />
  </article>
</template>

<script>
import SearchActionbar from '../components/search/Actionbar'
import SearchBookShow from '../components/search/BookShow'
import SearchBooksList from '../components/search/BooksList'
import useBooks from '@/composables/useBooks'

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
  setup() {
    const { state, hasBooks, setBook, setPage, find } = useBooks()

    return {
      state,
      hasBooks,
      setBook,
      setPage,
      find,
    }
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
