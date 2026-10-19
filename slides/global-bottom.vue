<template>
  <!-- page number on every slide except the title -->
  <div v-if="$nav.currentPage > 1" class="absolute bottom-3 right-5 text-sm opacity-50">
    {{ $nav.currentPage }} / {{ $nav.total }}
  </div>
</template>

<style>
:root {
  --slidev-transition-duration: 150ms;
}
</style>
