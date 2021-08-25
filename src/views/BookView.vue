<template>
  <div v-if="state.book">
    <book-show :book="state.book" />
  </div>
</template>

<script>
import BookShow from '../components/book/Show'
import useBook from '@/composables/useBook'

export default {
  name: 'book-view',
  head: {
    title: 'Book',
  },
  components: {
    BookShow,
  },
  props: {
    book: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { state } = useBook(props.book)

    return {
      state,
    }
  },
}
</script>
