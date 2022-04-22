import { ref } from '@vue/composition-api'
import { request } from '@/api'
import useCart from './useCart'

export default function useReservation() {
  const { cart } = useCart()

  const isCreating = ref(false)
  const hasSuccess = ref(false)
  const hasError = ref(false)

  const createReservation = (data) => {
    isCreating.value = true
    hasSuccess.value = false
    hasError.value = false

    return request('post', '/api/public/reservation/new', data)
      .then(() => {
        hasSuccess.value = true
        isCreating.value = false
        cart.value = []
      })
      .catch(() => {
        hasError.value = true
      })
  }

  return {
    isCreating,
    hasSuccess,
    hasError,
    createReservation,
  }
}
