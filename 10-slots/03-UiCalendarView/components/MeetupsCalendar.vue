<template>
  <UiCalendarView v-slot="{isoDate}">
    <UiCalendarEvent v-for="meetup in computedMeetups[isoDate]" :key="meetup.id" tag="a" :href="`/meetups/${meetup.id}`">
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },
  computed: {
    computedMeetups() {
      const finalMeetups = {};
      this.meetups.forEach(meetup => {
        const date = new Date(meetup.date);
        const formattedDate = this.formatDate(date.getFullYear(), date.getMonth(), date.getDate());
        if(!finalMeetups[formattedDate]) {
          finalMeetups[formattedDate] = [];
        }
        finalMeetups[formattedDate].push(meetup);
      });
      return finalMeetups
    }
  },
  methods: {
    formatDate(year, month, day) {
      const correctMonth = String(month + 1).padStart(2, '0');
      const correctDay =  String(day).padStart(2, '0');
      return `${year}-${correctMonth}-${correctDay}`
    }
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
