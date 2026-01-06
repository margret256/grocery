<template>
  <div>
    <h2>My Grocery List</h2>
    <GroceryForm />

    <StatsCard title="Total" :value="total" />
    <StatsCard title="Completed" :value="completed" />
    <StatsCard title="Remaining" :value="remaining" />

    <ul>
      <GroceryItem v-for="item in items" :key="item._id" :item="item" />
    </ul>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useGroceryStore } from '../store/grocery'
import GroceryForm from '../components/GroceryForm.vue'
import GroceryItem from '../components/GroceryItem.vue'
import StatsCard from '../components/StatsCard.vue'

const store = useGroceryStore()

onMounted(() => store.fetchItems())

const items = computed(() => store.items)
const total = computed(() => items.value.length)
const completed = computed(() => items.value.filter(i => i.completed).length)
const remaining = computed(() => total.value - completed.value)
</script>
