<template>
  <main class="min-h-screen bg-white text-slate-950">
    <header class="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-emerald-100 bg-white px-6 py-4 text-emerald-900 shadow-sm md:px-10">
      <h1 class="text-2xl font-black text-emerald-900 md:text-3xl">My Grocery List</h1>
      <div class="flex items-center gap-4">
        <button
          class="rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-800"
          type="button"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </header>

    <div class="grid gap-6 p-4 md:grid-cols-[17rem_1fr] md:p-6">
      <aside class="rounded-lg bg-emerald-50 p-4 shadow-xl shadow-slate-950/15">
        <section>
          <h2 class="border-b border-emerald-200 pb-2 text-lg font-black text-emerald-800">Filters</h2>
          <div class="mt-4 grid gap-2">
            <button
              v-for="option in filters"
              :key="option.value"
              class="rounded-md px-4 py-2 text-left font-bold transition"
              :class="filter === option.value ? 'bg-emerald-800 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'"
              type="button"
              @click="setFilter(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </section>

        <section class="mt-6 border-t border-emerald-200 pt-5">
          <h2 class="text-lg font-black text-emerald-800">Bulk Actions</h2>
          <div class="mt-4 grid gap-2">
            <button class="rounded-md bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700" type="button" @click="clearCompleted">
              Clear Completed
            </button>
            <button class="rounded-md bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-800" type="button" @click="clearAll">
              Clear All
            </button>
          </div>
        </section>

        <section class="mt-6 border-t border-emerald-200 pt-5">
          <h2 class="text-lg font-black text-emerald-800">Statistics</h2>
          <div class="mt-4 grid gap-3">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="rounded-md bg-white p-3 shadow-sm"
            >
              <p class="text-sm font-bold text-emerald-700">{{ stat.label }}</p>
              <p class="text-xl font-black">{{ stat.value }}</p>
            </div>
          </div>
        </section>
      </aside>

      <section
        class="rounded-lg border border-emerald-100 bg-white p-4 shadow-xl shadow-slate-950/10 md:p-6"
      >
        <form
          class="mx-auto mb-8 grid max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-emerald-950/20 ring-1 ring-emerald-100 md:grid-cols-[0.9fr_1.1fr]"
          @submit.prevent="submit"
        >
          <div class="relative min-h-72 overflow-hidden bg-emerald-950">
            <img
              src="/images/shop-4.jpg"
              alt="Fresh grocery items"
              class="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/65 to-lime-400/35"></div>
            <div class="relative flex h-full flex-col justify-between p-7 text-white md:p-8">
              <div>
                <p class="text-sm font-black uppercase tracking-[0.28em] text-lime-200">Add item</p>
                <h2 class="mt-4 text-4xl font-black leading-tight">Plan your next grocery run</h2>
              </div>
              <p class="mt-8 max-w-sm text-sm font-semibold text-emerald-50">
                Track quantity, category, and price in one clean list.
              </p>
            </div>
          </div>

          <div class="grid gap-4 p-6 md:p-8">
            <label class="block">
              <span class="form-label">Item name</span>
              <input v-model.trim="form.name" class="input mt-2" placeholder="Cake" required />
            </label>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="form-label">Quantity</span>
                <input v-model.number="form.quantity" class="input mt-2" min="1" placeholder="1" type="number" required />
              </label>

              <label class="block">
                <span class="form-label">Price</span>
                <input v-model.number="form.price" class="input mt-2" min="0" step="0.01" placeholder="0" type="number" required />
              </label>
            </div>

            <label class="block">
              <span class="form-label">Category</span>
              <select v-model="form.category" class="input mt-2" required>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </label>

            <button
              class="mt-2 rounded-lg bg-emerald-800 px-5 py-3 font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700"
              type="submit"
            >
              Add Grocery Item
            </button>
          </div>
        </form>

        <p v-if="error" class="mb-4 rounded-lg bg-red-50 px-4 py-3 font-semibold text-red-700">
          {{ error }}
        </p>

        <div v-if="store.loading" class="rounded-lg bg-emerald-50 p-5 text-center font-bold text-emerald-800">
          Loading groceries...
        </div>

        <ul v-else class="grid gap-3">
          <li
            v-for="item in items"
            :key="item._id"
            class="grid gap-3 rounded-lg bg-emerald-50 p-4 shadow-sm ring-1 ring-emerald-100 md:grid-cols-[1fr_auto] md:items-center"
          >
            <div>
              <h3 class="text-lg font-black" :class="{ 'line-through opacity-60': item.completed }">
                {{ item.name }}
              </h3>
              <p class="mt-1 font-semibold text-slate-600">
                {{ item.quantity }} {{ item.category }} - SHS {{ formatMoney(item.price) }} each - Total SHS {{ formatMoney(item.price * item.quantity) }}
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="btn bg-emerald-700 hover:bg-emerald-800" type="button" @click="toggle(item)">
                {{ item.completed ? 'Undo' : 'Complete' }}
              </button>
              <button class="btn bg-sky-700 hover:bg-sky-800" type="button" @click="openEdit(item)">
                Edit
              </button>
              <button class="btn bg-red-700 hover:bg-red-800" type="button" @click="remove(item)">
                Delete
              </button>
            </div>
          </li>
        </ul>

        <div v-if="!store.loading && items.length === 0" class="rounded-lg bg-emerald-50 p-8 text-center font-bold text-emerald-800">
          No grocery items found.
        </div>
      </section>
    </div>

    <div v-if="editingItem" class="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/60 px-4">
      <form
        class="w-full max-w-md rounded-xl bg-[url('/images/shop-6.jpg')] bg-cover bg-center p-6 shadow-2xl ring-1 ring-white/70"
        @submit.prevent="saveEdit"
      >
        <h2 class="mb-5 text-center text-2xl font-black text-slate-950">Edit Grocery Item</h2>
        <div class="grid gap-3">
          <input v-model.trim="editForm.name" class="input" placeholder="Item name" required />
          <input v-model.number="editForm.quantity" class="input" min="1" type="number" required />
          <input v-model.number="editForm.price" class="input" min="0" step="0.01" type="number" required />
          <select v-model="editForm.category" class="input" required>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <button class="rounded-lg bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-700" type="submit">
            Save Changes
          </button>
          <button class="rounded-lg bg-red-700 px-4 py-3 font-bold text-white hover:bg-red-800" type="button" @click="closeEdit">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useGroceryStore } from '../store/grocery'

const categories = ['Produce', 'Dairy', 'Meat', 'Bakery', 'Pantry', 'Frozen', 'Beverages', 'Snacks', 'Other']
const filters = [
  { label: 'All Items', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' }
]

const router = useRouter()
const auth = useAuthStore()
const store = useGroceryStore()
const filter = ref('all')
const error = ref('')
const editingItem = ref(null)
const form = reactive({
  name: '',
  quantity: 1,
  price: 0,
  category: 'Produce'
})
const editForm = reactive({
  name: '',
  quantity: 1,
  price: 0,
  category: 'Produce'
})

const items = computed(() => store.items)
const completedItems = computed(() => items.value.filter((item) => item.completed))
const remainingItems = computed(() => items.value.filter((item) => !item.completed))
const totalPrice = computed(() => items.value.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0))
const completedPrice = computed(() => completedItems.value.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0))
const remainingPrice = computed(() => remainingItems.value.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0))
const stats = computed(() => [
  { label: 'Total Items', value: items.value.length },
  { label: 'Completed', value: completedItems.value.length },
  { label: 'Incomplete', value: remainingItems.value.length },
  { label: 'Total Price', value: `SHS ${formatMoney(totalPrice.value)}` },
  { label: 'Completed Price', value: `SHS ${formatMoney(completedPrice.value)}` },
  { label: 'Incomplete Price', value: `SHS ${formatMoney(remainingPrice.value)}` }
])

onMounted(() => {
  store.fetchItems(filter.value).catch((err) => {
    store.loading = false
    error.value = err.response?.data?.message || 'Failed to load groceries'
  })
})

const formatMoney = (amount) => {
  return Number(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const setFilter = async (value) => {
  filter.value = value
  await store.fetchItems(filter.value)
}

const submit = async () => {
  error.value = ''

  try {
    await store.addItem({ ...form }, filter.value)
    form.name = ''
    form.quantity = 1
    form.price = 0
    form.category = 'Produce'
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to add item'
  }
}

const toggle = async (item) => {
  await store.updateItem(item._id, { completed: !item.completed }, filter.value)
}

const remove = async (item) => {
  if (confirm('Delete item?')) {
    await store.deleteItem(item._id, filter.value)
  }
}

const clearCompleted = async () => {
  await store.clearCompleted(filter.value)
}

const clearAll = async () => {
  if (confirm('Clear all grocery items?')) {
    await store.clearAll(filter.value)
  }
}

const openEdit = (item) => {
  editingItem.value = item
  editForm.name = item.name
  editForm.quantity = item.quantity
  editForm.price = item.price
  editForm.category = item.category
}

const closeEdit = () => {
  editingItem.value = null
}

const saveEdit = async () => {
  if (!editingItem.value) return
  await store.updateItem(editingItem.value._id, { ...editForm }, filter.value)
  closeEdit()
}

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.input {
  width: 100%;
  border-radius: 0.5rem;
  border-width: 2px;
  border-color: rgb(220 252 231);
  background-color: rgb(255 255 255 / 0.96);
  padding: 0.75rem 1rem;
  color: rgb(2 6 23);
  outline: none;
}

.input:focus {
  border-color: rgb(5 150 105);
  box-shadow: 0 0 0 4px rgb(167 243 208);
}

.form-label {
  font-size: 0.875rem;
  font-weight: 800;
  color: rgb(6 78 59);
}

.btn {
  border-radius: 0.5rem;
  padding: 0.625rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 800;
  color: white;
  transition: background-color 150ms ease, transform 150ms ease;
}

.btn:hover {
  transform: translateY(-1px);
}
</style>
