import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  const addProgressContainer = () => document.body.appendChild(document.createElement('div'));
  const instance = createApp(TheTopProgressBar).mount(container ?? addProgressContainer());
  const progress = {
    start: instance.start,
    finish: instance.finish,
    fail: instance.fail,
    install: (app) => app.provide(PROGRESS_KEY, progress)
  }
  if (router) {
    router.beforeEach(() => progress.start());
    router.afterEach(() => progress.finish());
    router.onError(() => progress.fail());
  }
  return progress
}
