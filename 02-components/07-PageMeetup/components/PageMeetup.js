import { defineComponent } from '../vendor/vue.esm-browser.js';

import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';

import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  data() {
    return {
      isLoading: false,
      pickedMeetup: null,
      errorMessage: null
    }
  },
  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },

  template: `
    <div class="page-meetup">
    <MeetupView v-if="pickedMeetup && !isLoading && !errorMessage" :meetup="pickedMeetup" />

      <UiContainer v-if='isLoading'>
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if='errorMessage'>
        <UiAlert>{{errorMessage}}</UiAlert>
      </UiContainer>
    </div>`,

    props: {
      meetupId: {
        type: Number
      }
    },
    
    watch: {
      meetupId: {
        handler(newValue, oldValue) {
          this.isLoading = true;
          fetchMeetupById(newValue)
            .then((res) => {
              this.pickedMeetup = res;
              this.isLoading = false;
            })
            .catch((err) => {
              this.isLoading = false;
              this.errorMessage = err.message;
            })
            
        },
        immediate: true,
      }
    }
});
