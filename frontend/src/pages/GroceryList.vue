<template>
  <form @submit.prevent="submit">
    <input v-model="name" placeholder="Item name" />
    <input v-model.number="quantity" type="number" placeholder="Qty" />
    <select v-model="category">
      <option>Produce</option>
      <option>Dairy</option>
      <option>Meat</option>
      <option>Bakery</option>
      <option>Pantry</option>
      <option>Frozen</option>
      <option>Beverages</option>
      <option>Snacks</option>
      <option>Other</option>
    </select>
    <button>Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useGroceryStore } from '../store/grocery'

const store = useGroceryStore()
const name = ref('')
const quantity = ref(1)
const category = ref('Produce')

const submit = () => {
  store.addItem({ name: name.value, quantity: quantity.value, category: category.value })
  name.value = ''
}
</script>
