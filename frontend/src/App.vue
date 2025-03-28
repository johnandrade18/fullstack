<template>
  <div class="min-h-screen bg-gray-100">
    <h1 class="py-4 text-2xl font-bold text-center">CRUD Application</h1>
    <ItemTable />
    <ItemDialog />
  </div>
</template>

<script setup>
import ItemTable from './components/ItemTable.vue';
import ItemDialog from './components/ItemDialog.vue';
</script>