<template>
  <div v-if="book.state.book">
    <b-container size="m">
      <h2 :style="{ wordBreak: 'break-word' }">{{ book.state.book.title }}</h2>
      <p
        v-if="book.state.book.authorSurname || book.state.book.authorFirstname"
      >
        {{ $t('by') }}
        {{
          author(book.state.book.authorFirstname, book.state.book.authorSurname)
        }}
      </p>
    </b-container>

    <b-container size="m">
      <div class="product">
        <div class="product_image">
          <book-image :book="book.state.book" />
        </div>

        <div class="product_details">
          <b-container
            size="m"
            v-if="book.state.book.shortDescription"
            :style="{ paddingTop: '0' }"
          >
            <p :style="{ whiteSpace: 'pre-wrap' }">
              {{ book.state.book.shortDescription }}
            </p>
          </b-container>

          <b-container size="m" v-if="book.state.book">
            <p>
              {{ $t('price') }}: {{ price(book.state.book.price) }}
              {{ book.state.book.currency }}
            </p>
            <p>{{ $t('genre') }}: {{ book.state.book.genre }}</p>
            <p>{{ $t('releaseYear') }}: {{ book.state.book.releaseYear }}</p>
            <p>
              {{ $t('format') }}:
              {{ book.state.book.format_name }}
            </p>
            <p v-if="book.state.book.cond">
              {{ $t('condition') }}: {{ book.state.book.cond }}
            </p>
          </b-container>

          <b-container size="m">
            <p>{{ $t('branch') }}: {{ book.state.book.branchName }}</p>
            <p :style="{ whiteSpace: 'pre-wrap' }">
              {{ book.state.book.branchOrdering }}
            </p>
          </b-container>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import useBook from '@/composables/useBook'
import { author, price } from '../services/formatter'
import BookImage from '@/components/book/Image'

export default {
  name: 'book-view',
  head: {
    title: 'Book',
  },
  components: {
    BookImage,
  },
  props: {
    book_id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const book = useBook(props.book_id)

    return {
      author,
      price,
      book,
    }
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
