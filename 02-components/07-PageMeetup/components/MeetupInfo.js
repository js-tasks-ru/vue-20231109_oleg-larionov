import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{organizer}}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{place}}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="formattedDate">{{tarnsformedDate}}</time>
      </li>
    </ul>`,
    props: {
      date: {
        type: Number,
        required: true
      },
      place: {
        type: String,
        required: true
      },
      organizer: {
        type: String,
        required: true
      },
    },
    computed: {
      formattedDate() {
        return new Date(this.date).toISOString().substr(0, 10)
      },
      tarnsformedDate() {
        return new Date(this.date).toLocaleDateString(navigator.language, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }
    }
});
