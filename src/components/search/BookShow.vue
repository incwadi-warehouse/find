<template>
  <b-modal :width="1200" @close="$emit('close', $event)" v-if="book">
    <b-container size="m">
      <h2>{{ book.title }}</h2>
      <p v-if="book.authorSurname || book.authorFirstname">
        {{ $t('by') }}
        {{ formatAuthor(book.authorFirstname, book.authorSurname) }}
      </p>
    </b-container>

    <div class="product">
      <div class="product_image">
        <b-container size="m" v-if="book.cover_m && book.cover_l">
          <img
            :src="book.cover_m"
            v-if="!hasZoom"
            @click="hasZoom = !hasZoom"
          />
          <img :src="book.cover_l" v-if="hasZoom" @click="hasZoom = !hasZoom" />
        </b-container>
      </div>

      <div class="product_details">
        <b-container
          size="m"
          v-if="book.shortDescription"
          :style="{ paddingTop: '0' }"
        >
          <p>{{ book.shortDescription }}</p>
        </b-container>

        <b-container size="m" v-if="book">
          <p>
            {{ $t('price') }}: {{ formatPrice(book.price) }}
            {{ book.currency }}
          </p>
          <p>{{ $t('genre') }}: {{ book.genre }}</p>
          <p>{{ $t('releaseYear') }}: {{ book.releaseYear }}</p>
          <p>{{ $t('type') }}: {{ $t(book.type) }}</p>
          <p v-if="book.cond">{{ $t('condition') }}: {{ book.cond }}</p>
        </b-container>

        <b-container size="m">
          <p>{{ $t('branch') }}: {{ book.branchName }}</p>
          <p :style="{ whiteSpace: 'pre-wrap' }">{{ book.branchOrdering }}</p>
        </b-container>
      </div>
    </div>

    <br />
    <br />
    <br />
    <br />
    <br />
  </b-modal>
</template>

<script>
import { ref } from '@vue/composition-api'
import { author, price } from '../../services/formatter'

export default {
  name: 'book-show',
  props: {
    book: Object,
  },
  setup() {
    let hasZoom = ref(true)

    return { hasZoom }
  },
  methods: {
    formatAuthor: author,
    formatPrice: price,
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
