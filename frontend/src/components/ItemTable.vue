<template>
  <div class="container px-4 py-6 mx-auto">
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="Add"
            icon="pi pi-plus"
            severity="success"
            @click="openDialog"
            class="mr-2 !bg-sky-500 !text-white"
          />
        </template>
      </Toolbar>

      <DataTable
        :value="items"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        class="!bg-white p-datatable-striped"
      >
        <Column field="name" header="Name" sortable></Column>
        <Column header="Actions" :exportable="false">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button
                icon="pi pi-pencil"
                severity="info"
                text
                rounded
                @click="editItem(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                @click="confirmDeleteItem(slotProps.data.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, computed, ref } from "vue";
  import { useItemStore } from "../stores/item.store";
  import { useConfirm } from "primevue/useconfirm";
  import Button from "primevue/button";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import Toolbar from "primevue/toolbar";

  const itemStore = useItemStore();
  const confirm = useConfirm();

  onMounted(() => {
    itemStore.fetchItems();
  });

  const openDialog = () => {
    itemStore.openDialog();
  };

  const editItem = (item) => {
    itemStore.openDialog(item);
  };

  const confirmDeleteItem = (id) => {
    confirm.require({
      message: "Are you sure you want to delete this item?",
      header: "Confirm Deletion",
      icon: "pi pi-info-circle",
      acceptClass: "p-button-danger",
      accept: () => {
        itemStore.deleteItem(id);
      },
    });
  };

  const items = computed(() => itemStore.items);
</script>
