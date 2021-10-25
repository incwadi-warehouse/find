<template>
  <b-container size="m" v-if="book">
    <img :src="image(book.id)" width="400" :alt="book.title" />
  </b-container>
</template>

<script>
export default {
  name: 'book-image',
  props: {
    book: Object,
  },
  setup() {
    const image = (id) => {
      return (
        process.env.VUE_APP_API +
        '/api/public/book/cover/' +
        id +
        '_400x400.jpg'
      )
    }

    return { image }
  },
}
</script>
