import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure you're importing the router correctly

createApp(App)
  .use(router) // Ensure you're using the router
  .mount('#app');
