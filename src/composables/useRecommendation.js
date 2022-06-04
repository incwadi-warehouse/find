import { onMounted, ref } from 'vue'
import { request } from '@/api'

export function useRecommendation() {
  const branch = import.meta.env.VUE_APP_BRANCH

  const recommendations = ref([])

  const list = () => {
    return request('get', '/api/public/book/recommendation/' + branch).then(
      (res) => {
        recommendations.value = res.data.books
      }
    )
  }

  onMounted(list)

  return { recommendations }
}
