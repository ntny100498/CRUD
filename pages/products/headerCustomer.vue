<template>
  <Toolbar>
    <template #start>
      <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
    </template>
  </Toolbar>
</template>

<script>
export default {
  methods: {
    openNew() {
      this.$emit('openNew');
    }
  }
}
</script>