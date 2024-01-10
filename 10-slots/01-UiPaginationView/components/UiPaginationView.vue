<template>
  <div class="pagination-container">
    <slot v-for="item in pageItems" :key="item.id" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',
  computed: {
    pageItems() {
      const startIndex = (this.page - 1) * this.perPage
      const endIndex = this.page * this.perPage
      return this.items.slice(startIndex, endIndex)
    }
  },
  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
