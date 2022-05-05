<template>
  <article>
    <b-container size="m" v-if="is404">
      <b-alert type="warning">
        {{ $t('notFoundDesc') }}
      </b-alert>
    </b-container>

    <b-container size="m" v-html="content" />

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
      <search-articles-list :articles="articles" />
    </b-container>

    <b-container size="m" v-if="pages > 1">
      <search-pagination :pages="pages" :page="page" />
    </b-container>

    <div v-if="term == null || articles.length == 0">
      <b-container size="m">
        <h3>{{ $t('recommendations') }}</h3>
      </b-container>

      <b-container size="m">
        <search-articles-card :articles="recommendations" />
      </b-container>
    </div>
  </article>
</template>

<script>
import SearchArticlesList from '../components/search/ArticlesList'
import SearchArticlesCard from '../components/search/ArticlesCard'
import SearchPagination from '@/components/search/Pagination'
import useRecommendation from '@/composables/useRecommendation'
import useArticle from '@/composables/useArticle'
import { computed, onMounted, toRefs, watch } from '@vue/composition-api'
import { debounce } from 'lodash'
import router from '@/router'
import useBranch from './../composables/useBranch'
import { marked } from 'marked'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchArticlesList,
    SearchArticlesCard,
    SearchPagination,
  },
  props: {
    term: String,
    page: Number,
    is404: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { term, page } = toRefs(props)

    const { recommendations, listRecommendations } = useRecommendation()

    const { articles, counter, isLoading, listArticles } = useArticle()

    const { branch } = useBranch()

    onMounted(listRecommendations)

    const pages = computed(() => {
      return Math.ceil(counter.value / 20)
    })

    const search = () => {
      if (!term.value) return

      listArticles(term.value, page.value)
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

    const content = computed(() => {
      if (!branch.value || !branch.value.content) return

      return marked.parse(branch.value.content.replace(/(<([^>]+)>)/gi, ''))
    })

    return {
      recommendations,
      articles,
      counter,
      isLoading,
      pages,
      search,
      searchOnInput,
      content,
    }
  },
}
</script>
