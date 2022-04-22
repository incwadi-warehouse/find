import { ref, watch } from '@vue/composition-api'
import { remove } from 'lodash'

const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

export default function useCart() {
  const addToCart = (book) => {
    cart.value.push({ id: book.id, title: book.title, price: book.price })
  }

  const removeFromCart = (book) => {
    cart.value = remove(cart.value, (item) => {
      return item !== book
    })
  }

  watch(
    () => cart.value,
    () => {
      localStorage.setItem('cart', JSON.stringify(cart.value))

      if (cart.value.length === 0) {
        localStorage.removeItem('cart')
      }
    }
  )

  return { cart, addToCart, removeFromCart }
}
