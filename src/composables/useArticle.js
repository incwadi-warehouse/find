import { ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

const articles = ref([])

export function useArticle() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

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
            value: import.meta.env.VUE_APP_BRANCH,
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

  const image = (id, size) => {
    return (
      import.meta.env.VUE_APP_API +
      '/api/public/book/cover/' +
      id +
      '_' +
      size +
      '.jpg'
    )
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
    image,
  }
}
