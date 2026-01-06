import { defineStore } from 'pinia'
import axios from 'axios'

export const useGroceryStore = defineStore('grocery', {
  state: () => ({
    items: []
  }),

  actions: {
    async fetchItems() {
      const res = await axios.get('http://localhost:5000/api/groceries', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      this.items = res.data
    },

    async addItem(item) {
      await axios.post('http://localhost:5000/api/groceries', item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      this.fetchItems()
    },

    async updateItem(id, data) {
      await axios.put(`http://localhost:5000/api/groceries/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      this.fetchItems()
    },

    async deleteItem(id) {
      await axios.delete(`http://localhost:5000/api/groceries/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      this.fetchItems()
    }
  }
})
