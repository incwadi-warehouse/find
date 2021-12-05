import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import { remove as _remove } from 'lodash'

export default function useCart() {
  const cart = ref([])

  const load = (data) => {
    cart.value = data.detail
  }

  const add = (book) => {
    cart.value.push({ id: book.id, title: book.title, price: book.price })

    document.dispatchEvent(
      new CustomEvent('cart-update', { detail: cart.value })
    )
  }

  const remove = (book) => {
    cart.value = _remove(cart.value, (item) => {
      return item !== book
    })

    if (cart.value.length === 0) {
      clean()
    }

    document.dispatchEvent(
      new CustomEvent('cart-update', { detail: cart.value })
    )
  }

  const clean = () => {
    document.dispatchEvent(new CustomEvent('cart-update', { detail: [] }))
  }

  onMounted(() => {
    document.addEventListener('cart-update', load)
  })

  onUnmounted(() => {
    document.removeEventListener('cart-update', load)
  })

  return { cart, add, remove, clean }
}
