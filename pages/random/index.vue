<template>
  <div :class="isBackground ? 'bg-success' : ''">
    <h1 @click="onClick(array1, index1, 'A')">{{ array1[index1] }}</h1>
    <h1 @click="onClick(array2, index2, 'B')">{{ array2[index2] }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBackground: false,
      index1: 0,
      array1: ['a', 'b', 'c', 'd'],
      index2: 0,
      array2: ['a', 'b', 'c', 'd']
    }
  },
  methods: {
    onClick(array, index, type) {
      switch (type) {
        case 'A':
          this.index1 = this.getIndex(array, index, this.index1);
          console.log(this.getIndex(array, index, this.index1));
          break;
        case 'B':
          this.index2 = this.getIndex(array, index, this.index2);
          break;
      }
      if (this.index1 == this.index2) this.isBackground = true;
      else this.isBackground = false;
    },
    getIndex(array, index, indexCurrent) {
      if (index < array.length - 1) return indexCurrent + 1;
      else return 0;
    }
  },
  mounted() {
    if (this.index1 == this.index2) this.isBackground = true;
  }
}
</script>

<style scoped>
h1 {
  user-select: none;
}
.bg-success {
  background-color: green;
}
</style>>