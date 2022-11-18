<template>
  <Dialog v-model:visible="display" :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
      <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
    </template>
  </Dialog>
</template>

<script>
export default {
  data() {
    return {
      display: false
    }
  },
  props: {
    product: {
      type: Object,
      default: {}
    },
    deleteProductDialog: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    display() {
      if (!this.display)
        this.$emit('hideDeleteDialog');
    },
    deleteProductDialog() {
      this.display = this.$props.deleteProductDialog;
    }
  },
  methods: {
    deleteProduct() {
      this.$emit('deleteProduct');
    }
  }
}
</script>