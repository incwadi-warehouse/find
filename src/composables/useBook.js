import book from '@/api/book'
import { onMounted, reactive } from '@vue/composition-api'

export default function useSearch(book_id) {
  const state = reactive({
    book: false,
  })

  const fetchBook = () => {
    book.fetch(book_id).then((response) => {
      state.book = response.data
    })
  }

  onMounted(fetchBook)

  return {
    state,
  }
}
