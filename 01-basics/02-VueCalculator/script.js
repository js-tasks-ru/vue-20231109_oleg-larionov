import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
createApp({
    data() {
        return {
            firstOperand: 0,
            secondOperand: 0,
            action: '',
            result: 0
        };
    },
    methods: {
        calculateResult() {
            if (this.action === 'sum') { this.result = this.firstOperand + this.secondOperand }
            else if (this.action === 'multiply') { this.result = this.firstOperand * this.secondOperand }
            else if (this.action === 'subtract') { this.result = this.firstOperand - this.secondOperand }
            else if (this.action === 'divide') { this.result = this.firstOperand / this.secondOperand }
        },
    },
    watch: {
        action() {
            this.calculateResult()
        },

        firstOperand() {
            this.calculateResult()
        },
        
        secondOperand() {
            this.calculateResult()
        }
    }
}).mount('#app');