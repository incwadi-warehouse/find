import { ref } from '@vue/composition-api'
import { request } from '@/api'

export default function useRecommendation() {
  const branch = process.env.VUE_APP_BRANCH

  const recommendations = ref([])
  const counter = ref(0)

  const listRecommendations = () => {
    return request('get', '/api/public/book/recommendation/' + branch).then(
      (response) => {
        recommendations.value = response.data.books
        counter.value = response.data.counter
      }
    )
  }

  return { recommendations, counter, listRecommendations }
}
