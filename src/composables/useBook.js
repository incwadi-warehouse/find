import { onMounted, reactive } from '@vue/composition-api'
import { request } from '~b/api'

export default function useSearch(book_id) {
  const state = reactive({
    book: false,
  })

  const fetchBook = () => {
    return request('get', '/api/public/book/' + book_id).then((response) => {
      state.book = response.data
    })
  }

  onMounted(fetchBook)

  return {
    state,
  }
}
