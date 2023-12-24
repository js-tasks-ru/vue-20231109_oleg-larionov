<template>
  <button @click="increase()">{{ internalCounterValue }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  data() {
    return {
      internalCounterValue: this.count
    }
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],
  methods: {
    increase() {
      this.internalCounterValue++;
      this.$emit('update:count', this.internalCounterValue)
    }
  },
  watch: {
    count() {
      this.internalCounterValue = this.count
    }
  }
};
</script>
