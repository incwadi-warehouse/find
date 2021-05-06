<template>
  <b-dropdown
    position="bottom"
    :style="{ display: 'inline-block', marginRight: '20px' }"
    v-if="items"
  >
    <template #selector>
      <strong>{{ title }} </strong>
      <span v-if="selectedItem">{{ selectedItem[name] }}</span>
      <span v-else>{{ $t('none') }}</span>
    </template>

    <b-dropdown-item
      v-for="item in items"
      :key="item[id]"
      :bold="selectedItem && selectedItem[id] == item[id]"
      @click="$emit('select', item)"
    >
      {{ item[name] }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'radio-filter-search',
  props: {
    selectedItem: Object,
    items: Array,
    title: String,
    id: {
      type: String,
      default() {
        return 'id'
      },
    },
    name: {
      type: String,
      default() {
        return 'name'
      },
    },
  },
}
</script>
