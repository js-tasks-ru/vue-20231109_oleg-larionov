<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': state === 'loading' }">
      <span class="image-uploader__text">{{ stateText }}</span>
      <input @click="handleRemoving" @change="onChange"  type="file" ref="input" accept="image/*"
       class="image-uploader__input" v-bind="$attrs"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },
  
  emits: ['remove', 'select', 'error', 'upload'],
  
  created() {
    if (this.preview) {
      this.state = 'uploaded'
    }
  },
  data() {
    return {
      state: 'empty',
      previewURL: this.preview,
      file: null,
    };
  },
  computed: {
    backgroundImage() {
      return this.previewURL ? `url(${this.previewURL})` : 'var(--default-cover)';
    },
    stateText() {
      if (this.state === 'loading') {
        return 'Загрузка...'
      }
      else if (this.state === 'uploaded') {
        return 'Удалить изображение'
      }
      else {
        return 'Загрузить изображение';
      }

    },
  },
  methods: {
    async upload(file) {
      if (this.uploader) {
        this.state = 'loading';
        try {
          const result = await this.uploader(file);
          this.handleSuccessfulUpload(result);
        }
        catch (error) {
          this.handleError(error);
        }
      }
      else {
        this.state = 'uploaded';
      }
    },

    onChange(event) {
      this.file = event.target.files[0];
   
      if (this.file) {
        this.previewURL = URL.createObjectURL(this.file);
      }
      else {
        this.previewURL = '';
      }
      this.$emit('select', this.file);
      this.upload(this.file);
    },

    handleSuccessfulUpload(result) {
      this.state = 'uploaded';
      this.$emit('upload', result);
    },

    handleError(error) {
      this.$emit('error', error);
      this.reset();
    },
    reset() {
      this.previewURL = null;
      this.$refs.input.value = null;
      this.state = 'empty';
    },
    handleRemoving(event) {
      if (this.state === 'uploaded') {
        event.preventDefault();
        this.$emit('remove');
        this.reset();
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), v-bind(backgroundImage);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
