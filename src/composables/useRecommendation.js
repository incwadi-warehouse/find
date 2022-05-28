import { onMounted, ref } from '@vue/composition-api'
import { request } from '@/api'

export function useRecommendation() {
  const branch = process.env.VUE_APP_BRANCH

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
