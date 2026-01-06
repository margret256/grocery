<template>
  <li>
    <input type="checkbox" :checked="item.completed" @change="toggle" />
    <span :style="{ textDecoration: item.completed ? 'line-through' : 'none' }">
      {{ item.name }} ({{ item.quantity }})
    </span>
    <button @click="remove">Delete</button>
  </li>
</template>

<script setup>
import { useGroceryStore } from '../store/grocery'

const props = defineProps(['item'])
const store = useGroceryStore()

const toggle = () => {
  store.updateItem(props.item._id, { completed: !props.item.completed })
}

const remove = () => {
  if (confirm('Delete item?')) {
    store.deleteItem(props.item._id)
  }
}
</script>
