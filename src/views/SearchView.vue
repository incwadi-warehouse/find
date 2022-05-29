<script>
import SearchArticlesList from '../components/search/List.vue'
import SearchArticlesCard from '../components/recommendations/Show.vue'
import SearchPagination from '@/components/search/Pagination.vue'
import SearchContent from '@/components/search/Content.vue'
import { useArticle } from '@/composables/useArticle.js'
import { computed, onMounted, toRefs, watch } from '@vue/composition-api'
import { debounce } from 'lodash'
import router from '@/router'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchArticlesList,
    SearchArticlesCard,
    SearchPagination,
    SearchContent,
  },
  props: {
    term: String,
    page: Number,
  },
  setup(props) {
    const { term, page } = toRefs(props)

    const { articles, counter, isLoading, list } = useArticle()

    const pages = computed(() => {
      return Math.ceil(counter.value / 20)
    })

    const search = () => {
      if (!term.value) return

      list(term.value, page.value)
    }

    onMounted(search)

    watch([() => term.value, () => page.value], () => {
      if (!term.value) {
        articles.value = []
        counter.value = 0
      }
      search()
    })

    let request = null

    const searchOnInput = (t) => {
      if (request !== null) {
        request.cancel()
      }

      request = debounce(() => {
        if (t === null) return

        router.push({
          name: 'search',
          query: { term: t, page: page.value },
        })
      }, 500)

      request()
    }

    return {
      articles,
      isLoading,
      pages,
      search,
      searchOnInput,
    }
  },
}
</script>

<template>
  <article>
    <search-content />

    <b-container size="m">
      <b-search
        focus
        branded
        :placeholder="$t('searchInTitleAuthorGenre')"
        :value="term"
        @input="searchOnInput"
        @submit.prevent="search"
        @reset="
          $router.push({
            name: 'search',
          })
        "
      />
    </b-container>

    <b-container size="m" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container
      size="m"
      v-if="term != null && articles.length == 0 && !isLoading"
    >
      <b-alert type="warning">
        <p>{{ $t('foundNothing') }}</p>
      </b-alert>
    </b-container>

    <b-container size="m" v-if="articles.length >= 1">
      <search-articles-list />
    </b-container>

    <b-container size="m" v-if="pages > 1">
      <search-pagination :pages="pages" :page="page" />
    </b-container>

    <div v-if="term == null || articles.length == 0">
      <b-container size="m">
        <h3>{{ $t('recommendations') }}</h3>
        <search-articles-card />
      </b-container>
    </div>
  </article>
</template>
