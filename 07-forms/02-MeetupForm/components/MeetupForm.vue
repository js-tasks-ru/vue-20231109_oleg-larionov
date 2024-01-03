<template>
  <form @submit.prevent="submit" class="meetup-form">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">

        <UiFormGroup label="Название">
          <UiInput v-model="localMeetup.title" name="title" />
        </UiFormGroup>

        <UiFormGroup label="Дата">
          <UiInputDate v-model="localMeetup.date" type="date" name="date" />
        </UiFormGroup>

        <UiFormGroup label="Место">
          <UiInput v-model="localMeetup.place" name="place" />
        </UiFormGroup>

        <UiFormGroup label="Описание">
          <UiInput v-model="localMeetup.description" multiline rows="3" name="description" />
        </UiFormGroup>

        <UiFormGroup label="Изображение">
          <ui-image-uploader name="image" :preview="meetup.image" @select="selectImage" @remove="removeImage" />
        </UiFormGroup>

      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>

      <meetup-agenda-item-form v-for="item, index in localMeetup.agenda" :key="item.id" v-model:agendaItem="localMeetup.agenda[index]"
        @remove="() => removeAgendaItem(item)" class="meetup-form__agenda-item" />


      <div class="meetup-form__append">
        <button @click="addAgendaItem()" class="meetup-form__append-button" type="button" data-test="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button @click="$emit('cancel')" variant="secondary" block class="meetup-form__aside-button"
          data-test="cancel">Отмена</ui-button>
        <ui-button variant="primary" block class="meetup-form__aside-button" data-test="submit"
          type="submit">{{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import UiButton from './UiButton.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiInputDate from '../../../06-wrappers/06-UiInputDate/components/UiInputDate.vue';
import UiImageUploader from '../../../06-wrappers/05-UiImageUploader/components/UiImageUploader.vue';
import { createAgendaItem } from '../meetupService.js';
export default {
  name: 'MeetupForm',
  data() {
    return {
      localMeetup: {
        agenda: this.meetup?.agenda?.map(meetup => meetup) || [],
        title: this.meetup.title ,
        date: this.meetup.date ,
        place: this.meetup.place ,
        image: this.meetup.image ,
        description: this.meetup.description,
      },
    }
  },
  components: {
    MeetupAgendaItemForm,
    UiButton,
    UiFormGroup,
    UiImageUploader,
    UiInput,
    UiInputDate,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
      default: '',
    },
  },
  emits: ['submit', 'cancel'],

  methods: {
    addAgendaItem() {
      let agendaItem = createAgendaItem();
      let agendaSize = this.localMeetup.agenda.length;
      if (this.localMeetup.agenda[agendaSize - 1]) {
        agendaItem.startsAt = this.localMeetup.agenda[agendaSize - 1].endsAt;
      }
      this.localMeetup.agenda.push(agendaItem);
    },

    updateAgendaItem(item) {
      let old = this.localMeetup.agenda.find(a => a.id === item.id);
      if (this.localMeetup.agenda.includes(old)) {
        this.localMeetup.agenda.splice(this.localMeetup.agenda.indexOf(old), 1, item);
      }
    },

    removeAgendaItem(item) {
      if (this.localMeetup.agenda.includes(item)) {
        this.localMeetup.agenda.splice(this.localMeetup.agenda.indexOf(item), 1)
      }
    },

    submit(event) {
      event.preventDefault();
      this.$emit('submit',
        {
          ...this.meetup,
          ...this.localMeetup,
          agenda: this.localMeetup.agenda.map(arr => ({ ...arr })),
        }
      );
    },

    selectImage(file) {
      this.localMeetup.image = '';
      this.imageToUpload = file;
    },

    removeImage() {
      this.localMeetup.image = '';
      this.imageToUpload = null;
    },
  }
};
</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item+.meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
