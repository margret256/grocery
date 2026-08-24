import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

export const useGroceryStore = defineStore('grocery', {
  state: () => ({
    items: [],
    loading: false
  }),

  actions: {
    async fetchItems(filter = 'all') {
      this.loading = true
      try {
        const res = await axios.get(`${API_URL}/groceries`, {
          params: { filter },
          headers: authHeaders()
        })
        this.items = res.data
      } finally {
        this.loading = false
      }
    },

    async addItem(item, filter = 'all') {
      await axios.post(`${API_URL}/groceries`, item, {
        headers: authHeaders()
      })
      await this.fetchItems(filter)
    },

    async updateItem(id, data, filter = 'all') {
      await axios.put(`${API_URL}/groceries/${id}`, data, {
        headers: authHeaders()
      })
      await this.fetchItems(filter)
    },

    async deleteItem(id, filter = 'all') {
      await axios.delete(`${API_URL}/groceries/${id}`, {
        headers: authHeaders()
      })
      await this.fetchItems(filter)
    },

    async clearCompleted(filter = 'all') {
      await axios.delete(`${API_URL}/groceries/clear/completed`, {
        headers: authHeaders()
      })
      await this.fetchItems(filter)
    },

    async clearAll(filter = 'all') {
      await axios.delete(`${API_URL}/groceries`, {
        headers: authHeaders()
      })
      await this.fetchItems(filter)
    }
  }
})
