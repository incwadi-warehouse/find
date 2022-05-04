import { ref, watch } from '@vue/composition-api'
import { remove } from 'lodash'

const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

export default function useCart() {
  const addToCart = (article) => {
    cart.value.push({
      id: article.id,
      title: article.title,
      price: article.price,
    })
  }

  const removeFromCart = (article) => {
    cart.value = remove(cart.value, (item) => {
      return item !== article
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
