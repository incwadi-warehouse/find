<template>
  <b-container size="m" v-if="article">
    <img :src="image(article.id)" width="400" :alt="article.title" />
  </b-container>
</template>

<script>
export default {
  name: 'article-image',
  props: {
    article: Object,
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
