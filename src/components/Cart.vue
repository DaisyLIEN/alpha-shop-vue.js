<template>
  <div class="cart-panel">
    <div class="cart-wrapper">
      <h3 class="cart-panel-title">購物籃</h3>
      <div class="item-row item-card" v-for="card in cards" :key="card.id">
        <img class="item-photo" :src="card.image" alt="" />
        <div class="item-description">
          <h4 class="item-title">{{ card.title }}</h4>
          <div class="item-count" :data-id="card.id" :data-price="card.price">
            <div @click.stop.prevent="handleCount('minus', card.id)">
              <img
                class="item-count-minus"
                src="https://i.imgur.com/sGdCWE9.png"
                alt=""
              />
            </div>
            <div class="count">{{ card.count }}</div>
            <div @click.stop.prevent="handleCount('plus', card.id)">
              <img
                class="item-count-plus"
                src="https://i.imgur.com/0py36xi.png"
                alt=""
              />
            </div>
          </div>
          <h4 class="item-price">${{ card.price }}</h4>
        </div>
      </div>
      <div class="item-row">
        <p>運費</p>
        <h5 class="shipping-fee">
          {{ shippingFeeSelected === "0" ? "免費" : `$${shippingFeeSelected}` }}
        </h5>
      </div>
      <div class="item-row">
        <p>小計</p>
        <h5 class="total-amount">${{ totalPrice }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = "alpha-shop";

export default {
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    shippingFeeSelected: {
      type: String,
      required: true,
    },
    initialTotalPrice: {
      type: Number,
      required: true,
    },
    initialCardsCount: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cards: [
        {
          id: 1,
          title: "破壞補丁修身牛仔褲",
          price: 3999,
          image: "https://i.imgur.com/U3k73rz.png",
          count: 1,
        },
        {
          id: 2,
          title: "刷色直筒牛仔褲",
          price: 1299,
          image: "https://i.imgur.com/ibpyA3m.png",
          count: 1,
        },
      ],
      totalPrice: 0,
      previousShippingFeeSelected: 0,
    };
  },
  created() {
    this.totalPrice = Number(this.initialTotalPrice);
    this.updateCardsCount();
  },
  methods: {
    handleCount(btn, id) {
      this.cards = this.cards.map((card) => {
        if (card.id === id) {
          let count = card.count;
          if (btn === "plus") {
            count++;
            this.totalPrice += card.price;
          } else if (btn === "minus" && count > 1) {
            count--;
            this.totalPrice -= card.price;
          }
          return {
            ...card,
            count: count,
          };
        }
        return card;
      });
    },
    shippingFeeAdd() {
      const targetFee = Number(this.shippingFeeSelected);
      if (targetFee === 0) {
        this.totalPrice -= this.previousShippingFeeSelected;
        this.previousShippingFeeSelected = 0;
      } else if (targetFee !== this.previousShippingFeeSelected) {
        this.previousShippingFeeSelected = targetFee;
        this.totalPrice += targetFee;
      }
      return;
    },
    saveStorage() {
      const getStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      const newStorage = {
        ...getStorage,
        totalPrice: this.totalPrice,
        cardsCount: this.getCardsCount(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
    },
    getCardsCount() {
      const cardsCount = this.cards.map((card) => {
        const { id, count } = card;
        card = {
          id,
          count,
        };
        return card;
      });
      return cardsCount;
    },
    updateCardsCount() {
      for (let i = 0; i < this.cards.length; i++) {
        for (let i = 0; i < this.initialCardsCount.length; i++) {
          if (this.cards[i].id === this.initialCardsCount[i].id) {
            this.cards[i].count = this.initialCardsCount[i].count;
          }
        }
      }
    },
  },
  watch: {
    totalPrice() {
      this.saveStorage();
    },
    shippingFeeSelected() {
      this.shippingFeeAdd();
    },
  },
};
</script>