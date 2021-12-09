<template>
  <article>
    <span @click="toggleModal" :style="{ cursor: 'pointer' }">
      <b-icon type="cart" :size="30" />
      <div class="badge" v-if="hasProducts">
        {{ cart.cart.value.length }}
      </div>
    </span>

    <b-form @submit.prevent="reservate">
      <b-modal :style="{ textAlign: 'left' }" @close="toggleModal" v-if="show">
        <template #title>
          {{ $t('cart') }}
        </template>

        <template #footer v-if="hasProducts">
          <b-form-group buttons>
            <b-button type="submit" design="primary">
              {{ $t('reservate') }}
            </b-button>
          </b-form-group>
        </template>

        <b-container size="m" v-if="hasProducts">
          <ul>
            <li v-for="book in cart.cart.value" :key="book.id">
              <router-link :to="{ name: 'book', params: { book_id: book.id } }">
                {{ book.title }}
              </router-link>
              <span @click="cart.remove(book)">
                <b-icon type="close" :size="15" />
              </span>
            </li>
          </ul>

          <b-form-group>
            <b-form-item>
              <b-form-label for="surname">{{ $t('surname') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input id="surname" required v-model="state.surname" />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="mail">{{ $t('mail') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input id="mail" v-model="state.mail" />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="phone">{{ $t('phone') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input id="phone" v-model="state.phone" />
            </b-form-item>
          </b-form-group>
        </b-container>

        <b-container size="m" v-if="reservation.state.isCreating">
          <b-alert type="neutral">
            <p>{{ $t('sending_request') }}</p>
          </b-alert>
        </b-container>

        <b-container size="m" v-if="reservation.state.hasError">
          <b-alert type="error">
            <p>{{ $t('request_error') }}</p>
          </b-alert>
        </b-container>

        <b-container size="m" v-if="reservation.state.hasSuccess">
          <b-alert type="success">
            <p>{{ $t('request_successful') }}</p>
            <b-button
              design="text"
              @click="
                toggleModal()
                reservation.state.hasSuccess = false
              "
              >{{ $t('ok') }}</b-button
            >
          </b-alert>
        </b-container>
      </b-modal>
    </b-form>
  </article>
</template>

<script>
import { reactive, computed, ref } from '@vue/composition-api'
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
      surname: null,
      mail: null,
      phone: null,
    })

    const show = ref(false)

    const toggleModal = () => {
      show.value = !show.value
    }

    const reservate = () => {
      reservation.create({
        books: state.books,
        notes:
          'Name: ' +
          state.surname +
          ' Mail: ' +
          state.mail +
          ' Phone: ' +
          state.phone,
      })
    }

    const hasProducts = computed(() => {
      return cart.cart.value.length >= 1
    })

    return {
      state,
      cart,
      reservation,
      show,
      toggleModal,
      reservate,
      hasProducts,
    }
  },
}
</script>

<style scoped>
.badge {
  display: inline-block;
  background: var(--color-primary-10);
  border-radius: 50%;
  font-size: 15px;
  padding: 0 5px;
}
</style>
