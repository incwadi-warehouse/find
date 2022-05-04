<template>
  <section>
    <span @click="toggleModal">
      <b-badge :content="cart.length" class="cart">
        <b-icon type="cart" :size="30" />
      </b-badge>
    </span>

    <b-form
      @submit.prevent="reservate"
      v-if="showModal"
      :style="{ margin: '0' }"
    >
      <b-modal :style="{ textAlign: 'left' }" @close="toggleModal">
        <template #title>
          {{ $t('cart') }}
        </template>

        <template #footer>
          <b-form-group buttons v-if="hasProducts">
            <b-button type="submit" design="text" v-if="isCreating">
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
                hasSuccess = false
              "
            >
              {{ $t('ok') }}
            </b-button>
          </b-form-group>
        </template>

        <b-container size="m" v-if="!hasProducts && !hasSuccess">
          <p>{{ $t('cart_is_empty') }}</p>
        </b-container>

        <b-container size="m" v-if="hasProducts">
          <ul>
            <li v-for="book in cart" :key="book.id">
              <router-link :to="{ name: 'article', params: { id: book.id } }">
                {{ book.title }}
              </router-link>
              <span @click="removeFromCart(book)">
                <b-icon type="close" :size="15" />
              </span>
            </li>
          </ul>

          <b-form-group>
            <b-form-item>
              <b-form-label for="salutation">{{
                $t('salutation')
              }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-select
                id="salutation"
                required
                :items="[
                  { key: 'f', value: $t('mrs') },
                  { key: 'm', value: $t('mr') },
                  { key: 'd', value: $t('none_diverse') },
                ]"
                allow-empty
                v-model="salutation"
              />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="surname">{{ $t('surname') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input id="surname" required v-model="surname" />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="mail">{{ $t('mail') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input type="email" id="mail" required v-model="mail" />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="phone">{{ $t('phone') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input type="tel" id="phone" v-model="phone" />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="notes">{{ $t('notes') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-textarea id="notes" v-model="notes" />
            </b-form-item>
          </b-form-group>
        </b-container>

        <b-container size="m" v-if="hasError">
          <b-alert type="error">
            <p>{{ $t('request_error') }}</p>
          </b-alert>
        </b-container>

        <b-container size="m" v-if="hasSuccess">
          <b-alert type="success">
            <p>{{ $t('request_successful') }}</p>
          </b-alert>
        </b-container>
      </b-modal>
    </b-form>
  </section>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import useCart from '@/composables/useCart'
import useReservation from '@/composables/useReservation'
import i18n from '@/i18n'

export default {
  name: 'cart',
  setup() {
    const { cart, removeFromCart } = useCart()

    const { isCreating, hasSuccess, hasError, createReservation } =
      useReservation()

    const books = computed(() => {
      if (cart.value === null) return
      let list = []
      cart.value.forEach((element) => {
        list.push(element.id)
      })
      return list.join(',')
    })
    const salutation = ref(null)
    const surname = ref(null)
    const mail = ref(null)
    const phone = ref(null)
    const notes = ref(null)

    const showModal = ref(false)

    const toggleModal = () => {
      showModal.value = !showModal.value
    }

    const hasProducts = computed(() => {
      return cart.value.length >= 1
    })

    // @deprecated
    const getSalutation = (val) => {
      let salutation = null
      if (val === 'f') {
        salutation = i18n.t('mrs')
      }
      if (val === 'm') {
        salutation = i18n.t('mr')
      }
      if (val === 'd') {
        salutation = i18n.t('none_diverse')
      }

      return salutation
    }

    // @deprecated
    const reservate = () => {
      createReservation({
        books: books.value,
        notes:
          getSalutation(salutation.value) +
          '\n' +
          surname.value +
          '\n' +
          mail.value +
          '\n' +
          phone.value +
          '\n' +
          notes.value,
      })
    }

    return {
      cart,
      removeFromCart,
      isCreating,
      hasSuccess,
      hasError,
      createReservation,
      books,
      salutation,
      surname,
      mail,
      phone,
      notes,
      showModal,
      toggleModal,
      hasProducts,
      reservate,
    }
  },
}
</script>

<style scoped>
.cart {
  cursor: pointer;
}
</style>
