import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
createApp({
  data() {
    return {
      meetupIds: [1, 2, 3, 4, 5],
      pickedMeetupId: '',
      meetup: '',

    };
  },

  methods: {
    async fetchMeetup() {
      this.meetup = await fetchMeetupById(this.pickedMeetupId)
    },
    pickMeetup(meetupId){
      this.pickedMeetupId = meetupId
    }
  },

  watch: {
    pickedMeetupId() {
      this.fetchMeetup()
    }
  }

}).mount('#app');