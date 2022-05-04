import { ref } from '@vue/composition-api'
import { request } from '@/api'

export default function useArticle() {
  const articles = ref([])
  const article = ref(null)
  const counter = ref(0)
  const isLoading = ref(false)

  const listArticles = (term, page) => {
    isLoading.value = true

    const params = {
      options: {
        term: term,
        filter: [
          {
            field: 'branch',
            operator: 'eq',
            value: process.env.VUE_APP_BRANCH,
          },
        ],
        orderBy: {
          article: [
            {
              field: 'added',
              direction: 'desc',
            },
          ],
        },
        offset: page * 20 - 20,
      },
    }

    return request('get', '/api/public/book/find', null, params).then(
      (response) => {
        articles.value = response.data.books
        counter.value = response.data.counter
        isLoading.value = false
      }
    )
  }

  const getArticle = (id) => {
    return request('get', '/api/public/book/' + id).then((response) => {
      article.value = response.data
    })
  }

  const formatPrice = (data) => {
    return Number.parseFloat(data).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatAuthor = (firstname, surname) => {
    if ('' === firstname) {
      return surname
    }
    return surname + ', ' + firstname
  }

  return {
    articles,
    article,
    counter,
    isLoading,
    listArticles,
    getArticle,
    formatPrice,
    formatAuthor,
  }
}
