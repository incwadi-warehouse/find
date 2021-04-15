<template>
  <b-actionbar>
    <template #input>
      <b-search
        :placeholder="$t('searchInTitleAuthorGenre')"
        icon
        @input="change"
        @submit.prevent="$emit('set-term', query)"
        @reset="$emit('reset')"
        v-model="query"
      />
    </template>
  </b-actionbar>
</template>

<script>
import _debounce from 'lodash/debounce'

export default {
  name: 'actionbar-search',
  props: {
    term: String,
  },
  data() {
    return {
      query: this.term === undefined ? null : this.term,
    }
  },
  setup(props, { emit }) {
    let changeRequest = null

    const change = (term) => {
      if (null !== changeRequest) {
        changeRequest.cancel()
      }

      changeRequest = _debounce(() => {
        if (null === term) return
        emit('set-term', term)
      }, 500)

      changeRequest()
    }

    return { change }
  },
}
</script>
