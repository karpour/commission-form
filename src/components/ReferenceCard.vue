<!--
/** 
 * Card component representing an uploaded file, only for use in the ReferenceUploader component.
 */
-->

<template>
  <div class="card text-center shadow-sm m-1 card-ref-img">
    <div class="card-img-overlay d-flex justify-content-end align-items-start p-1">
      <input
        type="button"
        class="btn btn-primary btn-sm btn-ref-card-cancel"
        value="🗙"
        @click="cancel()"
      />
    </div>
    <img class="card-img-top" :src="imageUrl" :alt="fileName" />
    <div class="card-body p-1">
      <p class="card-text">{{fileName}}</p>
    </div>
  </div>
</template>

<script>
/**
 * @vue-prop {String} fileName - Unique filename, displayed under the image
 * @vue-prop {String} imageUrl - URL of the image
 *
 * @vue-event {String} cancel - Emits the value of fileName when the 'x' button is clicked
 */
export default {
  name: "ReferenceCard",
  props: {
    fileName: String,
    imageUrl: String
  },
  methods: {
    /**
     * Emits 'cancel' event
     */
    cancel() {
      console.log("emitting cancel"); // eslint-disable-line
      this.$emit("cancel", this.fileName);
    }
  }
};
</script>

<style scoped>
.card-ref-img {
  width: 10rem;
}
.btn-ref-card-cancel {
  background-color: rgba(255, 0, 0, 0.5);
  border: none;
}
</style>
