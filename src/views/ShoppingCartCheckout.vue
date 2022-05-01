<template>
  <main class="main">
    <!-- stepper-panel -->
    <Stepper :current-step="currentStep" />
    <!-- form-panel -->
    <From
      :current-step="currentStep"
      :initial-user="user"
      @after-submit="handleFormAfterSubmit"
    />
    <!-- cart-panel -->
    <Cart
      :current-step="currentStep"
      :shipping-fee-selected="user.shippingFee"
      :initial-total-price="user.totalPrice"
      :initial-cards-count="user.cardsCount"
    />
  </main>
</template>

<script>
import Stepper from "./../components/Stepper.vue";
import From from "./../components/Form.vue";
import Cart from "./../components/Cart.vue";

const STORAGE_KEY = "alpha-shop";

export default {
  name: "ShoppingCartCheckout",
  components: {
    Stepper,
    From,
    Cart,
  },
  data() {
    return {
      currentStep: 1,
      user: {
        salutation: "",
        username: "",
        phone: "",
        email: "",
        city: "",
        addr: "",
        shippingFee: 0,
        ccname: "",
        cardnumber: "",
        expdate: "",
        cvv: "",
        totalPrice: 5298,
        cardsCount: [],
      },
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      ...this.user,
    };
    this.newStep(this.getStep);
  },
  methods: {
    newStep(currentStep) {
      this.currentStep = Number(currentStep);
    },
    handleFormAfterSubmit() {
      const getResults = JSON.parse(localStorage.getItem(STORAGE_KEY));

      for (const [key, value] of Object.entries(getResults)) {
        if (key === "cardsCount") {
          return;
        }
        console.log(`${key}: ${value}`);
      }
    },
  },
  computed: {
    getStep() {
      return this.$route.params.step;
    },
  },
  watch: {
    getStep(id) {
      this.newStep(id);
    },
  },
};
</script>

<style lang="scss">
</style>