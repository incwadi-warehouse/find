import { ref } from '@vue/composition-api'
import { request } from '@/api'

const articles = ref([])

export function useArticle() {
  const article = ref(null)
  const counter = ref(0)
  const isLoading = ref(false)

  const list = (term, page) => {
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

    return request('get', '/api/public/book/find', null, params).then((res) => {
      articles.value = res.data.books
      counter.value = res.data.counter
      isLoading.value = false
    })
  }

  const show = (id) => {
    return request('get', '/api/public/book/' + id).then((res) => {
      article.value = res.data
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
    list,
    show,
    formatPrice,
    formatAuthor,
  }
}
