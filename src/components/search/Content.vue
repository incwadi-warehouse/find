<script>
import { useBranch } from '@/composables/useBranch.js'
import { computed, defineComponent } from '@vue/composition-api'
import { marked } from 'marked'

export default defineComponent({
  setup() {
    const { branch } = useBranch()

    const content = computed(() => {
      if (!branch.value || !branch.value.content) return

      return marked.parse(branch.value.content.replace(/(<([^>]+)>)/gi, ''))
    })

    return { content }
  },
})
</script>

<template>
  <b-container size="m" v-html="content" />
</template>
