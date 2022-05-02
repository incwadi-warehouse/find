import { ref } from '@vue/composition-api'
import { request } from '@/api'

export default function useBook() {
  const books = ref([])
  const book = ref(null)
  const counter = ref(0)
  const isLoading = ref(false)

  const listBooks = (term, page) => {
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
          book: [
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
        books.value = response.data.books
        counter.value = response.data.counter
        isLoading.value = false
      }
    )
  }

  const getBook = (id) => {
    return request('get', '/api/public/book/' + id).then((response) => {
      book.value = response.data
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
    books,
    book,
    counter,
    isLoading,
    listBooks,
    getBook,
    formatPrice,
    formatAuthor,
  }
}
