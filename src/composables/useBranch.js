import { onMounted, ref } from 'vue'
import { request } from '@/api'

const branch = ref(null)

export function useBranch() {
  const show = () => {
    return request(
      'get',
      '/api/public/branch/show/' + import.meta.env.VUE_APP_BRANCH
    ).then((res) => {
      branch.value = res.data
    })
  }

  onMounted(show)

  return {
    branch,
  }
}
