<template>
    <div class="toast" :class="style">
        <UiIcon class="toast__icon" :icon="icon" />
        <span>{{ message }}</span>
    </div>
</template>
  
<script>
import UiIcon from './UiIcon.vue';

export default {
    name: 'UiToast',
    components: { UiIcon },
    props: {
        type: {
            type: String,
            requiered: true
        },
        message: {
            type: String,
            requiered: true
        },
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
            this.$emit("expired");
        }
    },
    emits: ['expired'],
    computed: {
        icon() {
            return this.type ==='success' ? 'check-circle' : 'alert-circle'
        },
        style() {
            return this.type === 'success' ? 'toast_success' : 'toast_error'
        }
    }
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
  