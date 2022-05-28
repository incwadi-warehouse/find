import { useCart } from './useCart.js'
import { request } from '@/api'
import { ref } from '@vue/composition-api'

export function useReservation() {
  const { cart } = useCart()

  const reservation = ref({})

  const isCreating = ref(false)

  const create = () => {
    isCreating.value = true

    return request('post', '/api/public/reservation/new', {
      books: reservation.value.books,
      notes: reservation.value.notes,
      salutation: reservation.value.salutation,
      firstname: reservation.value.firstname,
      surname: reservation.value.surname,
      mail: reservation.value.mail,
      phone: reservation.value.phone,
    })
      .then(() => {
        reservation.value = []
        cart.value = []
      })
      .finally(() => {
        isCreating.value = false
      })
  }

  return {
    reservation,
    isCreating,
    create,
  }
}
