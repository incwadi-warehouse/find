import { fetch } from '@/api/book'
import { onMounted, reactive } from '@vue/composition-api'

export default function useSearch(book) {
  const state = reactive({
    book: false,
  })

  const fetchBook = () => {
    fetch(book).then((response) => {
      state.book = response.data
    })
  }

  onMounted(fetchBook)

  return {
    state,
  }
}
