<template>
  <div v-if="book">
    <b-container size="m">
      <b-button
        design="primary"
        :style="{ float: 'right', marginTop: '10px' }"
        @click="cart.add(book)"
        v-if="!isInCart && book.branchCart"
        >{{ $t('reservate') }}</b-button
      >
      <b-button
        design="outline"
        disabled
        :style="{ float: 'right', marginTop: '10px' }"
        @click="cart.add(book)"
        v-if="isInCart && book.branchCart"
        >{{ $t('added_to_cart') }}</b-button
      >

      <h2 :style="{ wordBreak: 'break-word' }">{{ book.title }}</h2>

      <p v-if="book.authorSurname || book.authorFirstname">
        {{ $t('by') }}
        {{ author(book.authorFirstname, book.authorSurname) }}
      </p>
    </b-container>

    <b-container size="m">
      <div class="product">
        <div class="product_image">
          <book-image :book="book" />
        </div>

        <div class="product_details">
          <b-container size="m" v-if="book.shortDescription">
            <p class="wrap">{{ book.shortDescription }}</p>
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
            <p class="wrap">{{ book.branchOrdering }}</p>
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
import useCart from '@/composables/useCart'
import { find } from 'lodash'
import { computed } from '@vue/composition-api'

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
    const { book, getBook } = useBook()
    getBook(props.book_id)

    const cart = useCart()

    const isInCart = computed(() => {
      return find(cart.cart.value, (item) => {
        return item.id === props.book_id
      })
    })

    return {
      author,
      price,
      book,
      cart,
      isInCart,
    }
  },
}
</script>

<style scoped>
.product_image {
  width: 200px;
}
.wrap {
  white-space: pre-wrap;
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
