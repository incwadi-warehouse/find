import { onMounted, ref } from '@vue/composition-api'
import { request } from '@/api'

const branch = ref(null)

export function useBranch() {
  const show = () => {
    return request(
      'get',
      '/api/public/branch/show/' + process.env.VUE_APP_BRANCH
    ).then((res) => {
      branch.value = res.data
    })
  }

  onMounted(show)

  return {
    branch,
  }
}
