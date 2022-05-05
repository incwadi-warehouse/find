import { onMounted, ref } from '@vue/composition-api'
import { request } from '@/api'

const branch = ref(null)

export default function useBranch() {
  const show = () => {
    return request(
      'get',
      '/api/public/branch/show/' + process.env.VUE_APP_BRANCH
    ).then((response) => {
      branch.value = response.data
    })
  }

  onMounted(show)

  return {
    branch,
  }
}
