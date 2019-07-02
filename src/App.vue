<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <h1 class="display-1 text-center">Karpour's Commissions</h1>
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
        :selected="selectedComissionType == key"
        @choose="chooseHandler"
      ></ProductCard>
    </div>

    <!-- Reference uploader -->
    <div class="row">
      <div class="col-md-12">
        <h2>References</h2>
      </div>
    </div>
    <div class="row">
      <ReferenceUploader></ReferenceUploader>
    </div>

    <!-- Form -->
    <form class="py-3">
      <div class="form-group row">
        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputName" placeholder="Your name" required/>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="inputEmail" placeholder="Your e-mail" required/>
        </div>
      </div>
      <hr>
      <div class="form-group row">
        <label for="inputExpression" class="col-sm-2 col-form-label">Expression</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputExpression" placeholder="Optional: Expression you'd like your character to have"/>
        </div>
      </div>
    </form>
    <!-- Submit Button -->
    <div class="form-group row justify-content-center">
      <button type="submit" class="btn btn-primary btn-lg">Place order</button>
    </div>
  </div>
</template>

<script>
import ProductCard from "./components/ProductCard.vue";
import ReferenceUploader from "./components/ReferenceUploader.vue";

export default {
  name: "app",
  components: {
    ProductCard,
    ReferenceUploader
  },
  data: function() {
    return {
      commissionData: {},
      selectedComissionType: ""
    };
  },
  methods: {
    chooseHandler: function(e) {
      console.log("Selected" + e); // eslint-disable-line
      this.selectedComissionType = e;
    },
    setCommissionData(commissionData) {
      console.log(commissionData); // eslint-disable-line
      this.commissionData = commissionData;
    }
  },
  created: function() {
    console.log("Getting commission data\n"); // eslint-disable-line
    var self = this;
    this.$http
      .get("./commissionData.json")
      .then(function(response) {
        self.setCommissionData(response.data);
      })
      .catch(function(response) {
        console.log(response); // eslint-disable-line
      });
  }
};
</script>
