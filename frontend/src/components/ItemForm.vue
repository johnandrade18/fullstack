<template>
  <div>
    <input v-model="name" placeholder="Nombre del elemento" />
    <button @click="addItem">Agregar</button>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
        <button @click="deleteItem(item.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useItemStore } from "../stores/item.store";

  const itemStore = useItemStore();
  const name = ref("");
  const items = ref([]);

  itemStore.fetchItems().then(() => (items.value = itemStore.items));

  const addItem = () => {
    itemStore.addItem({ name: name.value });
    name.value = "";
  };

  const deleteItem = (id) => {
    itemStore.deleteItem(id);
  };
</script>
