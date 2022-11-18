<template>
  <DataTable :value="products" responsiveLayout="scroll">
    <template #header>
      <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
        <h3 class="mb-2 md:m-0 p-as-md-center">Manage Products</h3>
      </div>
    </template>
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="price" header="Price"></Column>
    <Column field="description" header="Description"></Column>
    <Column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
      </template>
    </Column>
    <productDetails :product="product" :productDialog="productDialog" :submitted="submitted"
    @hideDialog="hideDialog" @saveProduct="saveProduct" />
    <deleteProductDialog :product="product" :deleteProductDialog="deleteProductDialog" @hideDeleteDialog="hideDeleteDialog"
    @deleteProduct="deleteProduct"/>
  </DataTable>
</template>

<script>
import productDetails from '@/pages/products/productDetails';
import deleteProductDialog from '@/pages/products/deleteProductDialog';

export default {
  props: {
    product: {
      type: Object,
      default: {}
    },
    products: {
      type: Array,
      default: null
    },
    submitted: {
      type: Boolean,
      default: false
    },
    deleteProductDialog: {
      type: Boolean,
      default: false
    },
    productDialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    productDetails,
    deleteProductDialog
  },
  methods: {
    hideDialog() {
      this.$emit('hideDialog');
    },
    hideDeleteDialog() {
      this.$emit('hideDeleteDialog');
    },
    confirmDeleteProduct(data){
      this.$emit('confirmDeleteProduct', data);
    },
    saveProduct() {
      this.$emit('saveProduct');
    },
    deleteProduct() {
      this.$emit('deleteProduct');
    },
    editProduct(data) {
      this.$emit('editProduct', data);
    }
  }
}
</script>

<style scoped>

</style>