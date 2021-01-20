<template>
  <thead>
    <tr>
      <th>
        {{ $t('search.title') }}
      </th>
      <th>
        {{ $t('search.author') }}
      </th>
      <th>
        {{ $t('search.genre') }}
      </th>
      <th>
        {{ $t('search.type') }}
      </th>
      <th style="text-align: right" :title="$t('search.release_year')">
        {{ $t('search.year') }}
      </th>
      <th style="text-align: right">
        <!-- @fix currency -->
        {{ $t('search.price') }}
      </th>
      <th></th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'books-head-search',
}
</script>
