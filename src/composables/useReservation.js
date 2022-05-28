import { useCart } from './useCart.js'
import useToast from '@baldeweg/components/src/composables/useToast'
import { request } from '@/api'
import { ref } from '@vue/composition-api'
import i18n from '@/i18n.js'

export function useReservation() {
  const { cart } = useCart()

  const { add } = useToast()

  const isCreating = ref(false)

  const create = (data) => {
    isCreating.value = true

    return request('post', '/api/public/reservation/new', data)
      .then(() => {
        add({
          type: 'success',
          body: i18n.t('request_successful'),
        })
        isCreating.value = false
        cart.value = []
      })
      .catch(() => {
        add({
          type: 'error',
          body: i18n.t('request_error'),
        })
        isCreating.value = false
      })
  }

  return {
    isCreating,
    create,
  }
}
