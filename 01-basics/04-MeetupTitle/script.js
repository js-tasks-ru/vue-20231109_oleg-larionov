import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      console.log(response)
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

createApp({
  data() {
    return {
      meetupIds: [1, 2, 3, 4, 5],
      meetupId: null,
      pickedMeetup: null,
    };
  },

  watch: {
    meetupId(newMeetupId) {
      this.pickedMeetup = null;
      this.fetchMeetup(newMeetupId);
    },
  },

  methods: {
    fetchMeetup(id) {
      fetchMeetupById(id).then((meetup) => {
        this.pickedMeetup = meetup;
      });
    },
  },
}).mount('#app');