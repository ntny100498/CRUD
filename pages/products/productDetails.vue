<template>
  <Dialog header="Product Details" v-model:visible="display" :style="{width: '450px'}" :modal="true" class="p-fluid">
    <img src="@/static/placeholder.png" :alt="product.image" class="product-image" v-if="product.image" />
    <div class="field">
      <label for="name">Name</label>
      <InputText id="name" v-model.trim="product.name" required="true" autofocus
        :class="{ 'p-invalid': submitted && !product.name }" />
      <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
    </div>
    <div class="field">
      <label for="description">Description</label>
      <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
    </div>
    <div class="field">
      <label for="price">Price</label>
      <InputNumber id="price" v-model="product.price" mode="currency" currency="VND" locale="vi-VN" />
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
    </template>
  </Dialog>
</template>
<script>
export default {
  data () {
    return {
      display: false
    }
  },
  props: {
    product: {
      type: Object,
      default: {}
    },
    productDialog: {
      type: Boolean,
      default: false
    },
    submitted: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    display() {
      if (!this.display)
        this.$emit('hideDialog');
    },
    productDialog() {
      this.display = this.$props.productDialog;
    }
  },
  methods: {
    hideDialog() {
      this.$emit('hideDialog');
    },
    saveProduct() {
      this.$emit('saveProduct');
    }
  }
}
</script>