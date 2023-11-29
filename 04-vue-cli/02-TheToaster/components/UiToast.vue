<template>
    <div class="toast toast_success" :class="{ ['toast toast_error']: config.type === 'error' }">
        <UiIcon class="toast__icon" :icon="config.icon" />
        <span>{{ config.message }}</span>
    </div>
</template>
  
<script>
import UiIcon from './UiIcon.vue';

export default {
    name: 'UiToast',
    components: { UiIcon },
    props: {
        config: {
            type: Object,
            requiered: true
        }
    },
    mounted() {
        this.setLifeSpan();
    },
    methods: {
        setLifeSpan() {
            setTimeout(() => {
                this.emitExpiration();
            }, 5000);
        },
        emitExpiration() {
            this.$emit("expired", this.config.index);
        }
    },
};
</script>

<style scoped>
.toast {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 18px;
    line-height: 28px;
    width: auto;
}

.toast+.toast {
    margin-top: 20px;
}

.toast__icon {
    margin-right: 12px;
}

.toast.toast_success {
    color: var(--green);
}

.toast.toast_error {
    color: var(--red);
}
</style>
  