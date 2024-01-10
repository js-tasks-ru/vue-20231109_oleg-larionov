<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button @click="goPreviousMonth()" class="calendar-view__control-left" type="button"
          aria-label="Previous month"></button>
        <div class="calendar-view__date">{{ currentPickedDate }}</div>
        <button @click="goNextMonth()" class="calendar-view__control-right" type="button"
          aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="cell in finalCells" :key="cell.date" class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !cell.isActive }" tabindex="0">
        <div class="calendar-view__cell-day">{{ cell.day }}</div>
        <div class="calendar-view__cell-content">
          <slot :year="cell.year" :month="cell.month" :day="cell.day" :isoDate="cell.date"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiCalendarView',
  data() {
    return {
      currentDate: new Date()
    }
  },
  methods: {
    formatDate(year, month, day) {
      const correctMonth = String(month + 1).padStart(2, '0');
      const correctDay = String(day).padStart(2, '0');
      return `${year}-${correctMonth}-${correctDay}`
    },
    goPreviousMonth() {
      this.currentDate = new Date(this.previousMonthConfig.year, this.previousMonthConfig.month, 1)
    },
    goNextMonth() {
      this.currentDate = new Date(this.nextMonthConfig.year, this.nextMonthConfig.month, 1)
    },
  },
  computed: {
    currentPickedDate() {
      const currentPickedDate = this.currentDate.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      })
      return currentPickedDate
    },
    currentMonthConfig() {
      const currentYear = this.currentDate.getFullYear();
      const currentMonth = this.currentDate.getMonth();
      const days = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const lastDay = new Date(currentYear, currentMonth + 1, 0).getDay();

      return {
        year: currentYear,
        month: currentMonth,
        days: days,
        firstWeekDay: firstDay === 0 ? 7 : firstDay,
        lastWeekDay: lastDay === 0 ? 7 : lastDay,
      };
    },
    previousMonthConfig() {
      if (this.currentMonthConfig.month === 0) {
        return {
          year: this.currentMonthConfig.year - 1,
          month: 11,
          days: new Date(this.currentMonthConfig.year, this.currentMonthConfig.month, 0).getDate(),
        };
      }
      else {
        return {
          year: this.currentMonthConfig.year,
          month: this.currentMonthConfig.month - 1,
          days: new Date(this.currentMonthConfig.year, this.currentMonthConfig.month, 0).getDate(),
        };
      }
    },
    nextMonthConfig() {
      if (this.currentMonthConfig.month === 11) {
        return { year: this.currentMonthConfig.year + 1, month: 0 };
      } 
      else {
        return { year: this.currentMonthConfig.year, month: this.currentMonthConfig.month + 1 };
      }
    },
    finalCells() {
      const days = [];
      let day = null;
      if (this.currentMonthConfig.firstWeekDay !== 1) {
        day = this.previousMonthConfig.days - this.currentMonthConfig.firstWeekDay + 2
      }
      else {
        day = this.previousMonthConfig.days + 1;
      }

      while (day <= this.previousMonthConfig.days) {
        const date = this.formatDate(this.previousMonthConfig.year, this.previousMonthConfig.month, day);

        days.push({
          date: date,
          day: day,
          month: this.previousMonthConfig.month,
          year: this.previousMonthConfig.year,
          isActive: false,
        });
        day++;
      }

      for (let i = 1; i <= this.currentMonthConfig.days; i++) {
        const date = this.formatDate(this.currentMonthConfig.year, this.currentMonthConfig.month, i);

        days.push({
          date: date,
          day: i,
          month: this.currentMonthConfig.month,
          year: this.currentMonthConfig.year,
          isActive: true,
        });
      }

      for (let i = 1; i <= 7 - this.currentMonthConfig.lastWeekDay; i++) {
        const date = this.formatDate(this.nextMonthConfig.year, this.nextMonthConfig.month, i);
        days.push(
          {
            date: date,
            day: i,
            month: this.nextMonthConfig.month,
            year: this.nextMonthConfig.year,
            isActive: false,
          }
        );
      }
      return days;
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
</style>
