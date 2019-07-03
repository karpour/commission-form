<!--
/**
 * Bootstrap component for uploading one or more reference images
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
            :value="(Object.keys(uploadedFiles).length > 0)?'Add more':'Add a Reference'"
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

const maximumFileSize = 20971520; // 20MB

export default {
  name: "ReferenceUploader",
  data() {
    return {
      uploadedFiles: {},
      uploadError: null
    };
  },
  components: {
    ReferenceCard
  },
  methods: {
    /**
     * Handler for the 'x' button on a ReferenceCard
     * Deletes the corresponding file from the uploaded files List and updates the DOM
     */
    cancelHandler(fileName) {
      // Deletes the key and updates the DOM
      // Using the regular delete operator the DOM would not be updated
      this.$delete(this.uploadedFiles, fileName);
    },

    /**
     * Forwards event to the file input element
     */
    clickFileButton() {
      this.$refs.fileInput.click();
    },

    /**
     * Retrieves the files from the 'files' object of the file input element
     * and loads them as Base64 url.
     */
    addFiles() {
      var fileList = this.$refs.fileInput.files;
      // console.log(fileList); // eslint-disable-line

      for (const idx of Object.keys(fileList)) {
        this.getImage(fileList[idx])
          .then(loadedFile => {
            this.addFile(fileList[idx].name, loadedFile);
          })
          .catch(error => {
            console.log(error); // eslint-disable-line
          });
      }
    },

    /**
     * Loads a file as Base64 URL.
     *
     * @param {File} file - The file object to be loaded
     *
     * @return {Promise} - Promise, which returns a Base64 string representing the files contents
     */
    getImage(file) {
      return new Promise((resolve, reject) => {
        const fReader = new FileReader();
        // File size validation
        if (file.size < maximumFileSize) {
          fReader.onload = () => {
            resolve(fReader.result);
          };
          fReader.readAsDataURL(file);
        } else {
          reject(
            `File is bigger than the maximum file size of ${maximumFileSize /
              1024 /
              1024} MB`
          );
        }
      });
    },

    /**
     * Adds a file to the uploadedFiles List
     *
     * @param {String} fileName - File name
     * @param {String} file - Base64 string with the file data
     */
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
