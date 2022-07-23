import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useRecommendation() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

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
