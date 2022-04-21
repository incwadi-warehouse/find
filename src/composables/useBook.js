import { ref } from '@vue/composition-api'
import { request } from '@/api'
import useToast from '@baldeweg/components/src/composables/useToast'

export default function useBook() {
  const { add } = useToast()

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
        offset: page * 20 - 20,
      },
    }

    return request('get', '/api/public/book/find', null, params)
      .then((response) => {
        books.value = response.data.books
        counter.value = response.data.counter
      })
      .catch(() => {
        add({
          type: 'error',
          body: 'Error while searching books',
        })
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const getBook = (id) => {
    return request('get', '/api/public/book/' + id).then((response) => {
      book.value = response.data
    })
  }

  return {
    books,
    book,
    counter,
    isLoading,
    listBooks,
    getBook,
  }
}
