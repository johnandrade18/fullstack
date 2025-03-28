<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="itemStore.selectedItem ? 'Edit Item' : 'Add New Item'"
    modal
    :style="{ width: '450px' }"
    :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
    :closable="false"
  >
    <form @submit.prevent="handleSubmit" class="p-fluid">
      <div class="flex flex-col gap-4 ">
        <div class="flex flex-col w-full gap-4 p-input-icon-right">
          <label for="name" class="block mb-2 font-medium text-900">Name</label>
          <div class="flex items-center w-full gap-2">            
            <i class="pi pi-pencil" />
            <InputText
              id="name"
              v-model="formData.name"
              required
              autofocus
              class="w-full"
              :class="{ 'p-invalid': submitted && !formData.name }"
              :placeholder="itemStore.selectedItem ? 'Update name' : 'Enter name'"
            />
          </div>
          <small v-if="submitted && !formData.name" class="block text-red-500 p-error">
            Name is required
          </small>
        </div>
      </div>
      <div class="flex justify-end gap-4 mt-4">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="closeDialog"
        />
        <Button
          type="submit"
          :label="itemStore.selectedItem ? 'Update' : 'Save'"
          severity="primary"
        />
      </div>
    </form>
  </Dialog>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import { useItemStore } from "../stores/item.store";
  import { useToast } from "primevue/usetoast";
  import Dialog from "primevue/dialog";
  import InputText from "primevue/inputtext";
  import Button from "primevue/button";

  const itemStore = useItemStore();
  const toast = useToast();

  const formData = ref({ name: "" });
  const submitted = ref(false);

  const dialogVisible = computed({
    get: () => itemStore.dialogVisible,
    set: (value) => {
      if (!value) itemStore.closeDialog();
    },
  });

  // Reset form when dialog opens
  watch(dialogVisible, (newValue) => {
    if (newValue && itemStore.selectedItem) {
      // If editing an existing item, pre-fill the form
      formData.value = { ...itemStore.selectedItem };
      submitted.value = false;
    } else if (newValue) {
      // If adding a new item, reset the form
      formData.value = { name: "" };
      submitted.value = false;
    }
  });

  const handleSubmit = () => {
    submitted.value = true;

    // Validate form
    if (!formData.value.name.trim()) {
      return;
    }

    try {
      if (itemStore.selectedItem) {
        // Update existing item
        itemStore.updateItem(itemStore.selectedItem.id, formData.value);
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Item Updated",
          life: 3000,
        });
      } else {
        // Add new item
        itemStore.addItem(formData.value);
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Item Added",
          life: 3000,
        });
      }

      closeDialog();
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      });
    }
  };

  const closeDialog = () => {
    submitted.value = false;
    itemStore.closeDialog();
  };
</script>
