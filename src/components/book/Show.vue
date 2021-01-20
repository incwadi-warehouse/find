<template>
  <b-modal @close="$emit('close', $event)">
    <b-container size="m">
      <h1>{{ book.title }}</h1>
    </b-container>

    <b-container size="m" v-if="book">
      <pre>
        <code>
          {{ book }}
        </code>
      </pre>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: 'show-book',
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
}
</script>
