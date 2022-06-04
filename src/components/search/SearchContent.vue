<script setup>
import { useBranch } from '@/composables/useBranch.js'
import { computed } from 'vue'
import { marked } from 'marked'

const { branch } = useBranch()

const content = computed(() => {
  if (!branch.value || !branch.value.content) return

  return marked.parse(branch.value.content.replace(/(<([^>]+)>)/gi, ''))
})
</script>

<template>
  <b-container size="m"><p v-html="content" /></b-container>
</template>
