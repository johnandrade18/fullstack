import { defineStore } from 'pinia';
import axios from 'axios';
import type { Item } from '../type/data';

export const useItemStore = defineStore('item', {
  state: () => ({
    items: [],
  }),
  actions: {
    async fetchItems() {
      const response = await axios.get('http://localhost:3000/items');
      this.items = response.data;
    },
    async addItem(item: Item) {
      await axios.post('http://localhost:3000/items', item);
      await this.fetchItems();
    },
    async updateItem(id: string, item: Item) {
      await axios.put(`http://localhost:3000/items/${id}`, item);
      await this.fetchItems();
    },
    async deleteItem(id: string): Promise<void> {
      await axios.delete(`http://localhost:3000/items/${id}`);
      await this.fetchItems();
    },
  },
});