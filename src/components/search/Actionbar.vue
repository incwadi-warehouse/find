<template>
  <b-actionbar>
    <template #input>
      <b-search
        :placeholder="$t('searchInTitleAuthor')"
        icon
        @input="change"
        @submit.prevent="$emit('find')"
        @reset="$emit('reset')"
        :value="value"
      />
    </template>
  </b-actionbar>
</template>

<script>
import _debounce from 'lodash/debounce'

export default {
  name: 'search-actionbar-search',
  props: {
    value: String,
  },
  setup(props, { emit }) {
    let changeRequest = null

    const change = (term) => {
      if (null !== changeRequest) {
        changeRequest.cancel()
      }

      changeRequest = _debounce(() => {
        if (null === term) return
        emit('input', term)
        emit('find')
      }, 500)

      changeRequest()
    }

    return { change }
  },
}
</script>
