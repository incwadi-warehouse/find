<template>
  <article>
    <b-container size="m" v-if="cart.cart.value.length >= 1">
      <h2>
        {{ $t('cart') }}
        <span v-if="cart.cart">({{ cart.cart.value.length }})</span>
      </h2>

      <ul>
        <li v-for="book in cart.cart.value" :key="book.id">
          <router-link :to="{ name: 'book', params: { book_id: book.id } }">
            {{ book.title }}
          </router-link>
          <span @click="cart.remove(book)"
            ><b-icon type="close" :size="15"
          /></span>
        </li>
      </ul>

      <b-button
        type="button"
        design="text"
        @click="reservation.create({ books: state.books })"
      >
        {{ $t('reservate') }}
      </b-button>

      <b-alert type="neutral" v-if="reservation.state.isCreating">
        <p>{{ $t('sending_request') }}</p>
      </b-alert>

      <b-alert type="error" v-if="reservation.state.hasError">
        <p>{{ $t('request_error') }}</p>
      </b-alert>
    </b-container>

    <b-container size="m" v-if="reservation.state.hasSuccess">
      <b-alert type="success">
        <p>{{ $t('request_successful') }}</p>
        <b-button design="text" @click="reservation.state.hasSuccess = false">{{
          $t('ok')
        }}</b-button>
      </b-alert>
    </b-container>
  </article>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'
import useCart from '@/composables/useCart'
import useReservation from '@/composables/useReservation'

export default {
  name: 'cart',
  setup() {
    const cart = useCart()
    const reservation = useReservation()

    const state = reactive({
      books: computed(() => {
        if (null === cart.cart.value) return
        let list = []
        cart.cart.value.forEach((element) => {
          list.push(element.id)
        })
        return list.join(',')
      }),
    })

    return { state, cart, reservation }
  },
}
</script>
