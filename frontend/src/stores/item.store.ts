import { defineStore } from "pinia";
import axios from "axios";
import type { Item } from "../type/data";

export const useItemStore = defineStore("item", {
  state: () => ({
    items: [],
    selectedItem: null as Item | null,
    dialogVisible: false,
  }),
  actions: {
    async fetchItems() {
      const response = await axios.get(
        "https://fullstack-a1bh.onrender.com/items"
      );
      this.items = response.data;
    },
    async addItem(item: Item) {
      await axios.post("https://fullstack-a1bh.onrender.com/items", item);
      await this.fetchItems();
    },
    async updateItem(id: string, item: Item) {
      await axios.put(`https://fullstack-a1bh.onrender.com/items/${id}`, item);
      await this.fetchItems();
    },
    async deleteItem(id: string): Promise<void> {
      await axios.delete(`https://fullstack-a1bh.onrender.com/items/${id}`);
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
