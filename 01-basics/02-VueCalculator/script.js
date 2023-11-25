import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
createApp({
    data() {
        return {
            firstOperand: 0,
            secondOperand: 0,
            action: '',
            // result: 0
        };
    },
    computed: {
        result() {
            if (this.action === 'sum') { return this.firstOperand + this.secondOperand }
            else if (this.action === 'subtract') { return this.firstOperand - this.secondOperand }
            else if (this.action === 'multiply') { return this.firstOperand * this.secondOperand }
            else if (this.action === 'divide') { return this.firstOperand / this.secondOperand }
        }
    },

}).mount('#app');