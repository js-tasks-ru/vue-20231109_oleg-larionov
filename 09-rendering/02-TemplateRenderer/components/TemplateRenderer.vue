<script>

import { h, compile } from 'vue';

export default {
  name: 'TemplateRenderer',
  render() {
    return h(
      {
        components: this.components,
        render: this.localRenderFunction,
        props: ['bindings']
      },
      {
        bindings: this.bindings
      }
    )
  },
  computed: {
    localRenderFunction() {
      return compile(this.template)
    }
  },
  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },
};
</script>
