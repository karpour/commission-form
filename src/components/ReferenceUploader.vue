<!--
/**
 * Bootstrap component for uploading one or more reference images
 * @author Thomas Novotny
 */
-->

<template>
  <div class="col-md-12">
    <div class="text-center bg-light rounded-lg border">
        <div class="p-4">
            <input type="file" id="fileInput" style="display:none" ref="fileInput" multiple @change="addFile()"/>
            <input type="button" value="Add a Reference" class="btn btn-primary" @click="clickFileButton()">
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "ReferenceUploader",
    methods: {
        clickFileButton() {
            this.$refs.fileInput.click();
        },
        addFile() {
            console.log(this.$refs.fileInput.files) // eslint-disable-line

            // TODO add promise
        }
    }
}
</script>
