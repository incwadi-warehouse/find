<template>
  <b-modal :width="1200" @close="$emit('close', $event)" v-if="book">
    <b-container size="m">
      <h2 :style="{ wordBreak: 'break-word' }">{{ book.title }}</h2>
      <p v-if="book.authorSurname || book.authorFirstname">
        {{ $t('by') }}
        {{ author(book.authorFirstname, book.authorSurname) }}
      </p>
    </b-container>

    <div class="product">
      <div class="product_image">
        <b-container size="m">
          <img :src="image(book.id)" width="400" :alt="book.title" />
        </b-container>
      </div>

      <div class="product_details">
        <b-container
          size="m"
          v-if="book.shortDescription"
          :style="{ paddingTop: '0' }"
        >
          <p :style="{ whiteSpace: 'pre-wrap' }">{{ book.shortDescription }}</p>
        </b-container>

        <b-container size="m" v-if="book">
          <p>
            {{ $t('price') }}: {{ price(book.price) }}
            {{ book.currency }}
          </p>
          <p>{{ $t('genre') }}: {{ book.genre }}</p>
          <p>{{ $t('releaseYear') }}: {{ book.releaseYear }}</p>
          <p>
            {{ $t('format') }}:
            {{ book.format_name }}
          </p>
          <p v-if="book.cond">{{ $t('condition') }}: {{ book.cond }}</p>
        </b-container>

        <b-container size="m">
          <p>{{ $t('branch') }}: {{ book.branchName }}</p>
          <p :style="{ whiteSpace: 'pre-wrap' }">{{ book.branchOrdering }}</p>
        </b-container>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { author, price } from '../../services/formatter'

export default {
  name: 'book-show-search',
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

    return { author, price, image }
  },
}
</script>

<style scoped>
.product_image {
  width: 200px;
}

@media all and (min-width: 600px) {
  .product {
    display: flex;
  }
  .product_image {
    width: 33%;
    box-sizing: border-box;
  }
  .product_details {
    flex-grow: 1;
  }
}
</style>
