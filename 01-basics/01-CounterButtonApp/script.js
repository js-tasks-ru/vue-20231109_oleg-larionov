import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
createApp({
	data() {
		return {
			counter: 0,
		};
	},
	methods: {
		increaseCounter() {
			this.counter++;
		},
	},
}).mount('#app');