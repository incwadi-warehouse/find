<template>
  <b-actionbar>
    <template #input>
      <b-search
        icon
        :placeholder="$t('searchInTitleAuthorGenre')"
        :value="term"
        @input="change"
        @submit.prevent="$emit('find')"
        @reset="$emit('reset')"
      />
    </template>
  </b-actionbar>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'actionbar-search',
  props: {
    term: String,
  },
  setup(props, { emit }) {
    let changeRequest = null

    const change = (term) => {
      if (null !== changeRequest) {
        changeRequest.cancel()
      }

      changeRequest = debounce(() => {
        if (null === term) return
        emit('set-term', term)
      }, 500)

      changeRequest()
    }

    return { change }
  },
}
</script>
