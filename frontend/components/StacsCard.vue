<template>
  <div class="card">
    <h4>{{ title }}</h4>
    <p>{{ value }}</p>
  </div>
</template>

<script setup>
defineProps(['title', 'value'])
</script>
