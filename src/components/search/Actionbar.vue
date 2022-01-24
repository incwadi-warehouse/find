<template>
  <b-search
    focus
    branded
    :placeholder="$t('searchInTitleAuthorGenre')"
    :value="term"
    @input="change"
    @submit.prevent="$emit('find')"
    @reset="$emit('reset')"
  />
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'search-actionbar',
  props: {
    term: String,
  },
  setup(props, { emit }) {
    let request = null

    const change = (term) => {
      if (null !== request) {
        request.cancel()
      }

      request = debounce(() => {
        if (null === term) return
        emit('set-term', term)
      }, 500)

      request()
    }

    return { change }
  },
}
</script>
