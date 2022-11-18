<template>
  <div v-show="loading" class="loading">Loading&#8230;</div>
  <headerCustomer @openNew="openNew"/>
  <listProduct :products="products" :productDialog="productDialog" 
  :deleteProductDialog="deleteProductDialog" :product="product" :submitted="submitted"
  @hideDialog="hideDialog" @saveProduct="saveProduct" @confirmDeleteProduct="confirmDeleteProduct"
  @hideDeleteDialog="hideDeleteDialog" @deleteProduct="deleteProduct" @editProduct="editProduct"/>
  <Toast/>
</template>

<script>
import ProductService from "@/service/ProductService";
import headerCustomer from '@/pages/products/headerCustomer';
import listProduct from '@/pages/products/listProduct';

export default {
  data() {
    return {
      loading: true,
      products: [],
      product: {},
      productDialog: false,
      submitted: false,
      deleteProductDialog: false
    }
  },
  productService: null,
  methods: {
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    hideDeleteDialog() {
      this.deleteProductDialog = false;
    },
    confirmDeleteProduct(data) {
      this.product = data;
      this.deleteProductDialog = true;
    },
    saveProduct() {
      this.submitted = true;
      this.loading = true;
      if (this.product.name && this.product.name.trim()) {
        if (this.product.id) {
          this.productService.updateProduct(this.product)
          .then(() => {
            this.loading = false;
            this.fetchData();
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          })
          .catch(() => {
            this.loading = false;
            this.$toast.add({severity:'error', summary: 'Error', detail: 'Update product error', life: 3000});
          });
        }
        else {
          this.productService.createProduct(this.product)
          .then(() => {
            this.loading = false;
            this.fetchData();
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          })
          .catch(() => {
            this.loading = false;
            this.$toast.add({severity:'error', summary: 'Error', detail: 'Create product error', life: 3000});
          });
        }
        this.productDialog = false;
        this.product = {};
      }
    },
    deleteProduct() {
      this.loading = true;
      this.productService.deleteProduct(this.product.id)
      .then(() => {
        this.loading = false;
        this.fetchData();
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      })
      .catch(() => {
        this.loading = false;
        this.$toast.add({severity:'error', summary: 'Error', detail: 'Delete product error', life: 3000});
      });
      this.deleteProductDialog = false;
      this.product = {};
    },
    editProduct(data) {
      this.product = data;
      this.productDialog = true;
    },
    fetchData(){
      this.productService.getProducts()
      .then((data) => (this.products = data))
      .then(() => {
        this.loading = false;
      });
    }
  },
  created() {
    this.productService = new ProductService();
  },
  mounted() {
    this.fetchData();
  },
  components: {
    headerCustomer,
    listProduct
  }
}
</script>

<style scoped>
/* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>