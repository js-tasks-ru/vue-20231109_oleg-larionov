import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр и порождать событие

  template: `<button @click="emitIncreasingCount()" type="button">{{count}}</button>`,
  data() {
    return{
      newCount: 0
    }
  },
  methods: {
    emitIncreasingCount() {
      this.$emit('update:count', this.count + 1)
    }
  },
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
});
