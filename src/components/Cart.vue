<template>
  <span>
    <span @click="toggleModal" :style="{ cursor: 'pointer' }">
      <b-icon type="cart" :size="30" />
      <div class="badge" v-if="hasProducts">
        {{ cart.cart.value.length }}
      </div>
    </span>

    <b-form @submit.prevent="reservate" v-if="show" :style="{ margin: '0' }">
      <b-modal :style="{ textAlign: 'left' }" @close="toggleModal">
        <template #title>
          {{ $t('cart') }}
        </template>

        <template #footer>
          <b-form-group buttons v-if="hasProducts">
            <b-button
              type="submit"
              design="text"
              v-if="reservation.state.isCreating"
            >
              <b-spinner size="m" />
            </b-button>
            <b-button type="submit" design="primary" v-else>
              {{ $t('reservate') }}
            </b-button>
          </b-form-group>

          <b-form-group buttons v-else>
            <b-button
              type="button"
              design="primary"
              @click="
                toggleModal()
                reservation.state.hasSuccess = false
              "
            >
              {{ $t('ok') }}
            </b-button>
          </b-form-group>
        </template>

        <b-container
          size="m"
          v-if="!hasProducts && !reservation.state.hasSuccess"
        >
          <p>{{ $t('cart_is_empty') }}</p>
        </b-container>

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

          <b-form-fieldset>
            <b-form-legend>
              {{ $t('how_to_contact') }}
            </b-form-legend>

            <b-form-group>
              <b-form-item>
                <input
                  type="radio"
                  id="contact_mail"
                  value="mail"
                  v-model="contact"
                />
                <b-form-label for="contact_mail">{{ $t('mail') }}</b-form-label>
              </b-form-item>

              <b-form-item>
                <input
                  type="radio"
                  id="contact_phone"
                  value="phone"
                  v-model="contact"
                />
                <b-form-label for="contact_phone">
                  {{ $t('phone') }}
                </b-form-label>
              </b-form-item>
            </b-form-group>
          </b-form-fieldset>

          <b-form-group v-if="contact === 'mail'">
            <b-form-item>
              <b-form-label for="mail">{{ $t('mail') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input
                type="email"
                id="mail"
                :required="contact === 'mail'"
                v-model="state.mail"
              />
            </b-form-item>
          </b-form-group>

          <b-form-group v-if="contact === 'phone'">
            <b-form-item>
              <b-form-label for="phone">{{ $t('phone') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input
                type="tel"
                id="phone"
                :required="contact === 'phone'"
                v-model="state.phone"
              />
            </b-form-item>
          </b-form-group>
        </b-container>

        <b-container size="m" v-if="reservation.state.hasError">
          <b-alert type="error">
            <p>{{ $t('request_error') }}</p>
          </b-alert>
        </b-container>

        <b-container size="m" v-if="reservation.state.hasSuccess">
          <b-alert type="success">
            <p>{{ $t('request_successful') }}</p>
          </b-alert>
        </b-container>
      </b-modal>
    </b-form>
  </span>
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

    const contact = ref('mail')

    return {
      state,
      cart,
      reservation,
      show,
      toggleModal,
      reservate,
      hasProducts,
      contact,
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
  font-weight: bold;
  padding: 0 5px;
}
</style>
