import { defineStore } from "pinia";
import axios from "axios";
import type { Item } from "../type/data";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useItemStore = defineStore("item", {
  state: () => ({
    items: [],
    selectedItem: null as Item | null,
    dialogVisible: false,
  }),
  actions: {
    async fetchItems() {
      const response = await axios.get(`${API_URL}`);
      this.items = response.data;
    },
    async addItem(item: Item) {
      await axios.post(`${API_URL}`, item);
      await this.fetchItems();
    },
    async updateItem(id: string, item: Item) {
      await axios.put(`${API_URL}/${id}`, item);
      await this.fetchItems();
    },
    async deleteItem(id: string): Promise<void> {
      await axios.delete(`${API_URL}/${id}`);
      await this.fetchItems();
    },
    openDialog(item = null) {
      this.selectedItem = item;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.selectedItem = null;
      this.dialogVisible = false;
    },
  },
});
