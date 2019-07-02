<!--
/**
 * Bootstrap card component for displaying commission information.
 * @author Thomas Novotny
 */
-->

<template>
  <div class="col-md-4 pb-3" style>
    <div :class="['card',selected?'selected':'']">
      <div class="card-header text-center">
        <h3 class="card-title mb-0">{{title}}</h3>
      </div>
      <!-- Carousel -->
      <div class="carousel slide carousel-fade" :id="carouselName" data-interval="5000" data-ride="carousel"> 
        <div class="carousel-inner">
          <div :class="['carousel-item',index==0?'active':'']" v-for="(imageItem, index) in images" :key="index">
            <img class="d-block img-fluid w-100" :src="imageItem" />
          </div>
        </div>
        <!-- Carousel controls -->
        <a class="carousel-control-prev" :href="'#'+carouselName" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" :href="'#'+carouselName" role="button" data-slide="next">
          <span class="carousel-control-next-icon"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <!--Card body-->
      <div class="card-body">
        <p class="card-text">{{description}}</p>
        <span>{{price}}€{{priceUpper ? ' - ' + priceUpper + '€' : ''}}</span>
        <input class="btn btn-primary float-right" type="button" value="I want this" @click="selectCard()">
      </div>
    </div>
  </div>
</template>

<script>
/**
   * @vue-prop {String} name - Name, used internally as key
   * @vue-prop {String} title - Commission type, displayed on top of the card
   * @vue-prop {String} description - Optional description, displayed under the image carousel
   * @vue-prop {Number} price - Price of the commission
   * @vue-prop {Number} priceUpper - Optional upper price of the commission
   * @vue-prop {Array} images - Array of Strings with paths to sample images
   * @vue-prop {Boolean} selected - Defines if item is in selected state, affects style
   * 
   * @vue-event {String} choose - Emits this components' name when the select button is clicked
   */
export default {
  name: "ProductCard",
  props: {
    name: String,
    title: String,
    description: String,
    price: Number,
    priceUpper: Number,
    images: Array,
    selected: Boolean
  },
  computed: {
      carouselName: function(){
          return 'carousel-'+this.name;
      }
  },
  methods: {
    selectCard() {
      this.$emit('choose', this.name);
    }
  }
};
</script>

<style scoped>
.selected {
  border-style: solid;
  border-width: 2px;
  border-color: black;
}
</style>