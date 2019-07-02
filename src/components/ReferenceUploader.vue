<!--
/**
 * Bootstrap component for uploading one or more reference images
 * File upload code based on 
 * @author Thomas Novotny
 */
-->

<template>
  <div class="col-md-12">
    <!-- Invisible upload button, triggered by #addRefButton -->
    <form enctype="multipart/form-data" novalidate>
      <input
        type="file"
        id="fileInput"
        style="display:none"
        ref="fileInput"
        accept="image/*"
        multiple
        @change="addFiles"
      />
    </form>
    <div
      class="text-center bg-light rounded-lg border d-flex flex-row p-1 flex-wrap justify-content-center justify-content-md-start"
    >
      <!-- Uploaded file cards -->
      <ReferenceCard
        v-for="(value, name) of uploadedFiles"
        :imageUrl="value"
        :fileName="name"
        :key="name"
        @cancel="cancelHandler"
      ></ReferenceCard>
      <div class="card m-1">
        <div
          class="card-body d-flex flex-colum align-items-center justify-content-center card-add-ref"
        >
          <input
            id="addRefButton"
            type="button"
            :value="uploadedFiles.length?'Add more':'Add a Reference'"
            class="btn btn-primary"
            @click="clickFileButton()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReferenceCard from "./ReferenceCard.vue";

export default {
  name: "ReferenceUploader",
  data() {
    return {
      uploadedFiles: {},
      uploadError: null,
    };
  },
  components: {
    ReferenceCard
  },
  methods: {
    cancelHandler(fileName) {
      // Deletes the key and updates the DOM
      // Using the regular delete operator the DOM would not be updated
      this.$delete(this.uploadedFiles, fileName);
    },

    clickFileButton() {
      this.$refs.fileInput.click();
    },

    addFiles() {
      var fileList = this.$refs.fileInput.files;
      console.log(fileList); // eslint-disable-line

      for (const idx of Object.keys(fileList)) {
        console.log("File " + idx + "\n"); // eslint-disable-line
        console.log(fileList[idx]); // eslint-disable-line
        this.getImage(fileList[idx]).then(loadedFile => {
          console.log("trying to call addFile"); // eslint-disable-line
          this.addFile(fileList[idx].name, loadedFile);
        });
      }
    },
    getImage(file) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        const fReader = new FileReader();

        fReader.onload = () => {
          resolve(fReader.result);
        };

        fReader.readAsDataURL(file);
      });
    },
    addFile(fileName, file) {
      console.log("Adding file " + fileName); // eslint-disable-line
      console.log(file); // eslint-disable-line
      this.$set(this.uploadedFiles, fileName, file);
    }
  }
};
</script>

<style scoped>
.card-add-ref {
  width: 10rem;
}
</style>
