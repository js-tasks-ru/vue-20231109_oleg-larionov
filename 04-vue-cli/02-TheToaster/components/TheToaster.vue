<template>
  <div class="toasts">
    <UiToast v-for="toastConfig in toasts" :key="toastConfig" :config="toastConfig" @expired="handleDeletion" />
    <!-- <div v-for="toast in toasts" :key="toast" class="toast toast_success" :class="{['toast toast_error']: toast.type === 'error'}">
      <UiIcon class="toast__icon" :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </div> -->
    <!-- <div v-if="state === 'success'" class="toast toast_success">
      <UiIcon class="toast__icon" icon="check-circle" />
      <span>Success Toast Example</span>
    </div>

    <div v-if="state === 'error'" class="toast toast_error">
      <UiIcon class="toast__icon" icon="alert-circle" />
      <span>Error Toast Example</span>
    </div> -->
  </div>
</template>

<script>
// import UiIcon from './UiIcon.vue';
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiToast },
  data() {
    return {
      state: '',
      toasts: []
    }
  },
  methods: {
    success(message) {
      this.toasts.push(
        {
          message: message,
          type: 'success',
          icon: 'check-circle',
          index: this.toasts.length
        }
      );

    },
    error(message) {
      this.toasts.push(
        {
          message: message,
          type: 'error',
          icon: 'alert-circle',
          index: this.toasts.length
        }
      );
    },
    handleDeletion(toastIndex) {
      const indexOfToastToDelete = this.toasts.indexOf(this.toasts.find((toast) => toast.index === toastIndex));
      this.toasts.splice(indexOfToastToDelete, 1)
    },

  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

</style>
