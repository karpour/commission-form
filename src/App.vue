<template>
  <div class="container">
    <!-- Header -->
    <div class="row">
      <div class="col py-2 bg-info">
        <h1 class="display-3 text-center text-white">
          <strong>Art by Karpour</strong>
        </h1>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 py-2 text-center text-md-left">
        <h2>Please choose your commission type</h2>
      </div>
    </div>
    <!-- Commission info cards -->
    <div class="row justify-content-center">
      <ProductCard
        v-for="(item, key) in commissionData"
        :key="key"
        :name="key"
        :title="item.displayName"
        :description="item.description"
        :price="item.price"
        :priceUpper="item.priceUpper"
        :images="item.samples"
        :selected="selectedCommissionType == key"
        @choose="chooseHandler"
      ></ProductCard>
    </div>

    <!-- Reference uploader -->
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center text-md-left">References</h2>
      </div>
    </div>

    <div class="row">
      <ReferenceUploader></ReferenceUploader>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="py-3">
      <!-- Name -->
      <div class="form-group row">
        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder="Your name"
            required
            v-model.lazy="formFields.name"
          />
        </div>
      </div>

      <!-- e-mail -->
      <div class="form-group row">
        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Your e-mail"
            required
            v-model.lazy="formFields.email"
          />
        </div>
      </div>

      <!-- Telegram -->
      <div class="form-group row">
        <label for="basic-url" id="labelTelegram" class="col-sm-2 col-form-label">Telegram</label>
        <div class="col-sm-10">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input
              type="text"
              class="form-control"
              id="inputTelegram"
              aria-describedby="labelTelegram"
              placeholder="Your Telegram handle"
              v-model.lazy="formFields.telegram"
            />
          </div>
        </div>
      </div>

      <!-- Twitter -->
      <div class="form-group row">
        <label for="basic-url" id="labelTwitter" class="col-sm-2 col-form-label">Twitter</label>
        <div class="col-sm-10">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input
              type="text"
              class="form-control"
              id="inputTwitter"
              aria-describedby="labelTwitter"
              placeholder="Your Twitter handle"
              v-model.lazy="formFields.twitter"
            />
          </div>
        </div>
      </div>

      <!-- Means of communication selection -->

      <!-- This is currently very static and would benefit from being split into components -->
      <!-- Display radio buttons only if there are alternative contact methods given other than e-mail -->
      <div
        class="form-group row"
        v-if="formFields.telegram.length>0 || formFields.twitter.length>0"
      >
        <label for="inputName" class="col-sm-2 col-form-label">How to reach you</label>
        <div class="col-sm-10">
          <div class="radio">
            <label>
              <input
                type="radio"
                name="optradio"
                v-model="formFields.contactMethod"
                value="email"
                checked
              />
              <span class="px-2">
                <font-awesome-icon :icon="['fas', 'at']" size="1x" />
              </span>
              E-mail
            </label>
          </div>
          <div class="radio" v-if="formFields.twitter">
            <label>
              <input
                type="radio"
                name="optradio"
                v-model="formFields.contactMethod"
                value="twitter"
              />
              <span class="px-2">
                <font-awesome-icon :icon="['fab', 'twitter']" size="1x" />
              </span>
              Twitter
            </label>
          </div>
          <div class="radio" v-if="formFields.telegram">
            <label>
              <input
                type="radio"
                name="optradio"
                v-model="formFields.contactMethod"
                value="telegram"
              />
              <span class="px-2">
                <font-awesome-icon :icon="['fab', 'telegram']" size="1x" />
              </span>
              Telegram
            </label>
          </div>
        </div>
      </div>

      <hr />

      <!-- Expression -->
      <div class="form-group row">
        <label for="inputExpression" class="col-sm-2 col-form-label">Expression</label>
        <div class="col-sm-10">
          <input
            v-model="formFields.inputExpression"
            type="text"
            class="form-control"
            id="inputExpression"
            placeholder="Optional: Character expression"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="additionalInfo" class="col-sm-2 col-form-label">Additional information</label>
        <div class="col-sm-10">
          <textarea
            v-model="formFields.additionalInfo"
            class="form-control"
            rows="3"
            id="additionalInfo"
            placeholder="Any additional information about your commission goes here."
          ></textarea>
        </div>
      </div>

      <!-- Total estimate -->
      <div class="form-group row justify-content-center">
        <p class="display-4 text-info text-center">Estimated total: {{formattedPrice}}</p>
      </div>

      <!-- Reminder to select commission type -->
      <div class="row justify-content-center">
        <div class="col-12">
          <p class="text-muted text-center">{{commissionSelected?'&nbsp;':'Please select a commission type.'}}</p>
        </div>
      </div>
      <!-- Submit Button -->
      <div class="form-group row justify-content-center">
        <button
          type="submit"
          class="btn btn-primary btn-lg"
          :disabled="!commissionSelected"
          data-toggle="modal"
          :data-target="formValidated?'#successModal':''"
        >Place order</button>
      </div>
    </form>
    <SuccessModal></SuccessModal>
  </div>
</template>

<script>
import ProductCard from "./components/ProductCard.vue";
import ReferenceUploader from "./components/ReferenceUploader.vue";
import SuccessModal from "./components/SuccessModal.vue";

export default {
  name: "app",
  components: {
    ProductCard,
    ReferenceUploader,
    SuccessModal
  },
  data: function() {
    return {
      commissionData: {},
      selectedCommissionType: "",
      selectedCommissionPrice: 0,
      selectedCommissionPriceUpper: 0,
      formFields: {
        name: "",
        email: "",
        telegram: "",
        twitter: "",
        contactMethod: "email",
        expression: "",
        additionalInfo: ""
      },
    };
  },
  methods: {
    /**
     * Handles a press of the choice button of a ProductCard
     */
    chooseHandler: function(e) {
      // console.log("Selected " + e);  // eslint-disable-line
      this.selectedCommissionType = e.name;
      this.selectedCommissionPrice = e.price;
      this.selectedCommissionPriceUpper = e.priceUpper;
    },
    /**
     * Sets the Commission items which will be used as data source
     * the ProductCard instances
     */
    setCommissionData(commissionData) {
      // console.log(commissionData);  // eslint-disable-line
      this.commissionData = commissionData;
    },
    /**
     * Handles form submission
     */
    handleSubmit() {
      // TODO Possible add more validation code here
      // (Check for best practices)

      // Assemble FormData Object
      // Add all non-empty fields to the FormData Object
      let formData = new FormData;
      for(let key in this.formFields){
        if(this.formFields[key]){
          console.log(key+": "+this.formFields[key]);  // eslint-disable-line
          formData.append(key,this.formFields[key]);
        }
      }
      // Add files to Formdata object
      // TODO add files
    }
  },
  /**
   * Makes a (mocked) API call to retrieve the commission data and stores it
   */
  created: function() {
    // console.log("Getting commission data\n"); // eslint-disable-line
    var self = this;
    this.$http
      .get("./commissionData.json")
      .then(function(response) {
        self.setCommissionData(response.data);
      })
      .catch(function(response) {
        console.log(response); // eslint-disable-line
      });
  },

  computed: {
    /**
     * Returns the formatted price, e.g. 30€
     * If upperPrice is set, then the format is <price>€ - <upperPrice>€
     */
    formattedPrice() {
      return (
        this.selectedCommissionPrice +
        "€" +
        (this.selectedCommissionPriceUpper > 0
          ? " - " + this.selectedCommissionPriceUpper + "€"
          : "")
      );
    },
    /**
     * Performs validation on required form elements, returns true if form is ready to send
     * Checks for name, e-mail and commission type. All other inputs are considered optional
     */
    formValidated() {
      return (
        this.formFields.name.length > 0 &&
        this.formFields.email.length > 0 &&
        this.commissionSelected
      );
    },
    /**
     * Returns true is a commission item is selected
     */
    commissionSelected() {
      return this.selectedCommissionType!="";
    }
  }
};
</script>
