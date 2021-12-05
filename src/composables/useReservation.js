import { reactive } from '@vue/composition-api'
import { request } from '~b/api'

export default function useReservation() {
  const base = '/api/public/reservation'

  const state = reactive({
    isCreating: false,
    hasSuccess: false,
    hasError: false,
  })

  const create = (data) => {
    state.isCreating = true
    state.hasSuccess = false
    state.hasError = false

    return request('post', base + '/new', data)
      .then(() => {
        state.hasSuccess = true
        document.dispatchEvent(new CustomEvent('cart-update', { detail: [] }))
      })
      .catch(() => {
        state.hasError = true
      })
      .finally(() => {
        state.isCreating = false
      })
  }

  return {
    state,
    create,
  }
}
