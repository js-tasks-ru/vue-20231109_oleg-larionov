<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button @click="goPreviousMonth()" class="calendar-view__control-left" type="button"
          aria-label="Previous month"></button>
        <div class="calendar-view__date">{{ returnCurrentMonthRus() }}</div>
        <button @click="goNextMonth()" class="calendar-view__control-right" type="button"
          aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <!-- <div v-for="i in 30" :key="i" class="calendar-view__cell calendar-view__cell_inactive" tabindex="0">
        <div class="calendar-view__cell-day">{{ i }}</div>
        <div class="calendar-view__cell-content"></div>
      </div> -->
      <div v-for="(cell) in finalCells" :key="cell" class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !cell.isActive }" tabindex="0">
        <div class="calendar-view__cell-day">{{ cell.day }}</div>

        <div v-for="meetup in cell.meetups" :key="meetup" class="calendar-view__cell-content">
          <a :href="`/meetups/${meetup.id}`" class="calendar-event">{{meetup.title}}</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'MeetupsCalendar',
  mounted() {

  },
  data() {
    return {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
    };
  },
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getFirstDayOfMonthNumber(year, month) {
      const date = new Date(year, month - 1, 1, 0).getDay();
      return date === 0 ? 7 : date;
    },
    getLastDayOfMonthNumber(year, month) {
      const date = new Date(year, month - 1 + 1, 0).getDay();
      return date === 0 ? 7 : date;
    },
    returnPreviousMonthLastDays(currentYear, currentMonth, firstDayNumberOfCurrentMonth) {
      const leftDays = [];
      let newMonth = null;
      let newYear = null;

      let daysLeft = firstDayNumberOfCurrentMonth - 1 // сколько дней предывущего месяца надо добавить
      currentMonth === 1 ? newMonth = 12 : newMonth = currentMonth - 1
      currentMonth === 1 ? newYear = currentYear - 1 : newYear = currentYear

      let lastDayOfPreviousMonth = new Date(newYear, newMonth, 0).getDate() // последний день предыдущего месяца
      while (daysLeft !== 0) {
        leftDays.push(
          {
            day: lastDayOfPreviousMonth,
            isActive: false,
            timestamp: +new Date(newYear, newMonth-1, lastDayOfPreviousMonth),
            meetups: []
          }
        );
        lastDayOfPreviousMonth--;
        daysLeft--
      }
      return leftDays.reverse()
    },
    returnNextMonthLastDays(currentYear, currentMonth, lastDayNumberOfCurrentMonth) {
      const leftDays = []
      let newMonth = null;
      let newYear = null

      currentMonth === 12 ? newYear = currentYear + 1 : newYear = currentYear;
      currentMonth === 12 ? newMonth = 1 : newMonth = currentMonth + 1;

      const daysLeft = 7 - lastDayNumberOfCurrentMonth;
      if (daysLeft != 0) {
        for (let i = 1; i <= daysLeft; i++) {
          leftDays.push(
            {
              day: i,
              isActive: false,
              timestamp: +new Date(newYear, newMonth-1, i),
              meetups: []
            }
          )
        }
      }
      return leftDays
    },
    goPreviousMonth() {
      if (this.currentMonth === 1) {
        this.currentYear = this.currentYear - 1
        this.currentMonth = 12
      }
      else {
        this.currentMonth = this.currentMonth - 1
      }
    },
    goNextMonth() {
      if (this.currentMonth === 12) {
        this.currentYear = this.currentYear + 1
        this.currentMonth = 1
      }
      else {
        this.currentMonth = this.currentMonth + 1
      }

    },
    returnCurrentMonthRus() {
      const year = this.currentYear
      const month = this.currentMonth - 1
      return new Date(year, month).toLocaleDateString(navigator.language, {
        year: "numeric",
        month: "long",
      })
    },

    enrichDays(cells) {
      for (let i = 0; i < cells.length; i++) {
        this.meetups.forEach((meetup) => {
          if (meetup.date >= cells[i].timestamp && meetup.date <= cells[i + 1]?.timestamp) {
            cells[i].meetups.push(meetup)
          }
        })
      }
    }

  },
  computed: {
    finalCells() {
      const currentMonth = [];
      const thisMonthDaysQuantity = new Date(this.currentYear, this.currentMonth, 0).getDate()
      for (let i = 1; i <= thisMonthDaysQuantity; i++) {
        currentMonth.push(
          {
            day: i,
            isActive: true,
            timestamp: +new Date(this.currentYear, this.currentMonth-1, i),
            meetups: []

          }
        )
      }
      const firstDayOfMonthNumber = this.getFirstDayOfMonthNumber(this.currentYear, this.currentMonth);
      const lastDayOfMonthNumber = this.getLastDayOfMonthNumber(this.currentYear, this.currentMonth);
      const previousMonth = this.returnPreviousMonthLastDays(this.currentYear, this.currentMonth, firstDayOfMonthNumber);
      const nextMonth = this.returnNextMonthLastDays(this.currentYear, this.currentMonth, lastDayOfMonthNumber);
      let fullLayoutContent = previousMonth.concat(currentMonth, nextMonth);
      this.enrichDays(fullLayoutContent)
      return fullLayoutContent
    },

  }
};
</script>

<style scoped>
.calendar-view {}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
