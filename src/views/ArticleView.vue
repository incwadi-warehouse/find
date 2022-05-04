<template>
  <div v-if="article">
    <b-container size="m">
      <b-button
        design="primary"
        class="cta"
        @click="addToCart(article)"
        v-if="!isInCart && article.branchCart"
        >{{ $t('reservate') }}</b-button
      >
      <b-button
        design="outline"
        disabled
        class="cta"
        v-if="isInCart && article.branchCart"
        >{{ $t('added_to_cart') }}</b-button
      >

      <h2 :style="{ wordBreak: 'break-word' }">{{ article.title }}</h2>

      <p v-if="article.authorSurname || article.authorFirstname">
        {{ $t('by') }}
        {{ formatAuthor(article.authorFirstname, article.authorSurname) }}
      </p>
    </b-container>

    <b-container size="m">
      <div class="product">
        <div class="product_image">
          <article-image :article="article" />
        </div>

        <div class="product_details">
          <b-container size="m" v-if="article.shortDescription">
            <p class="wrap">{{ article.shortDescription }}</p>
          </b-container>

          <b-container size="m" v-if="article">
            <p>
              {{ $t('price') }}: {{ formatPrice(article.price) }}
              {{ article.currency }}
            </p>
            <p>{{ $t('genre') }}: {{ article.genre }}</p>
            <p>{{ $t('releaseYear') }}: {{ article.releaseYear }}</p>
            <p>
              {{ $t('format') }}:
              {{ article.format_name }}
            </p>
            <p v-if="article.cond">{{ $t('condition') }}: {{ article.cond }}</p>
          </b-container>

          <b-container size="m">
            <p>{{ $t('branch') }}: {{ article.branchName }}</p>
            <p class="wrap">{{ article.branchOrdering }}</p>
          </b-container>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import useArticle from '@/composables/useArticle'
import ArticleImage from '@/components/article/Image'
import useCart from '@/composables/useCart'
import { find } from 'lodash'
import { computed } from '@vue/composition-api'

export default {
  name: 'article-view',
  head: {
    title: 'article',
  },
  components: {
    ArticleImage,
  },
  props: {
    id: String,
  },
  setup(props) {
    const { article, getArticle, formatPrice, formatAuthor } = useArticle()

    const { cart, addToCart } = useCart()

    getArticle(props.id)

    const isInCart = computed(() => {
      return find(cart.value, (item) => {
        return item.id === props.id
      })
    })

    return {
      article,
      formatPrice,
      formatAuthor,
      cart,
      addToCart,
      isInCart,
    }
  },
}
</script>

<style scoped>
.cta {
  float: right;
  margin-top: 10px;
}
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
