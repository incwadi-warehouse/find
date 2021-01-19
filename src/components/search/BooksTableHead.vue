<template>
  <thead>
    <tr>
      <th>
        {{ $t('title') }}
      </th>
      <th>
        {{ $t('author') }}
      </th>
      <th>
        {{ $t('genre') }}
      </th>
      <th>
        {{ $t('type') }}
      </th>
      <th style="text-align: right" :title="$t('release_year')">
        {{ $t('year') }}
      </th>
      <th style="text-align: right">
        <!-- @fix currency -->
        {{ $t('price') }}
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'books-head-search',
}
</script>
