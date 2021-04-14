<template>
  <div :style="{ textAlign: 'center' }">
    <ul class="pagination">
      <li class="pagination_item" @click="$emit('set-page', page - 1)">
        &lt; {{ $t('back') }}
      </li>
      <li
        class="pagination_item"
        @click="$emit('set-page', 1)"
        v-if="1 != page"
      >
        1
      </li>
      <li class="pagination_item isSelected" @click="$emit('set-page', page)">
        {{ page }}
      </li>
      <li
        class="pagination_item"
        @click="$emit('set-page', pages)"
        v-if="pages != page"
      >
        {{ pages }}
      </li>
      <li class="pagination_item" @click="$emit('set-page', page + 1)">
        {{ $t('forward') }} &gt;
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'pagination-search',
  props: {
    pages: Number,
    page: Number,
  },
}
</script>

<style scoped>
.pagination {
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
}
.pagination_item {
  display: inline-block;
  border-radius: 5px;
  border: 1px solid var(--color-neutral-02);
  padding: 3px 10px;
  margin: 0 10px;
  cursor: pointer;
}
.pagination_item.isSelected {
  border: 1px solid var(--color-primary-10);
  color: var(--color-primary-10);
}
.pagination_item:hover {
  border: 1px solid var(--color-primary-10);
}
</style>
