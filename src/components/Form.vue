<template>
  <form class="form-panel d-flex flex-column justify-content-between">
    <div class="part" v-show="currentStep === 1">
      <h2 class="part-title">寄送地址</h2>
      <div class="form-rows-wrapper">
        <div class="form-row form-row-gender">
          <label for="salutation">稱謂</label>
          <div class="select-wrapper">
            <select
              v-model="user.salutation"
              name="salutation"
              id="salutation"
              class="salutation"
              required
            >
              <option value="Mr.">先生</option>
              <option value="Ms.">小姐</option>
            </select>
          </div>
        </div>
        <div class="form-row form-row-name">
          <label for="username">姓名</label>
          <input
            v-model="user.username"
            name="username"
            id="username"
            type="text"
            placeholder="請輸入姓名"
          />
        </div>
        <div class="form-row form-row-tel">
          <label for="phone">電話</label>
          <input
            v-model="user.phone"
            name="phone"
            id="phone"
            type="text"
            placeholder="請輸入行動電話"
          />
        </div>
        <div class="form-row form-row-email">
          <label for="email">Email</label>
          <input
            v-model="user.email"
            name="email"
            id="email"
            type="text"
            placeholder="請輸入電子郵件"
          />
        </div>
        <div class="form-row form-row-city">
          <label for="city">縣市</label>
          <div class="select-wrapper">
            <select v-model="user.city" name="city" id="city" required>
              <option disabled selected value="">請選擇縣市</option>
              <option value="台北市">台北市</option>
              <option value="新北市">新北市</option>
              <option value="桃園市">桃園市</option>
              <option value="新竹市">新竹市</option>
              <option value="新竹縣">新竹縣</option>
            </select>
          </div>
        </div>
        <div class="form-row form-row-address">
          <label for="addr">地址</label>
          <input
            v-model="user.addr"
            name="addr"
            id="addr"
            type="text"
            placeholder="請輸入地址"
          />
        </div>
      </div>
    </div>
    <div class="part" v-show="currentStep === 2">
      <h2 class="part-title">運送方式</h2>
      <div class="form-rows-wrapper">
        <div class="form-row">
          <div
            class="form-row-radio-wrapper d-flex align-items-center"
            :class="{ checked: user.shippingFee === '0' }"
          >
            <input
              v-model="user.shippingFee"
              type="radio"
              name="shippingFee"
              id="shippingFee"
              value="0"
            />
            <label for="shippingFee"
              >標準運送
              <p>約3~7個工作天</p>
              <span>免費</span>
            </label>
          </div>
          <div
            class="form-row-radio-wrapper d-flex align-items-center"
            :class="{ checked: user.shippingFee === '500' }"
          >
            <input
              v-model="user.shippingFee"
              type="radio"
              name="shippingFee"
              id="shippingFee"
              value="500"
            />
            <label for="shippingFee"
              >DHL 貨運
              <p>48小時內送達</p>
              <span>$500</span></label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="part" v-show="currentStep === 3">
      <h2 class="part-title">付款資訊</h2>
      <div class="form-rows-wrapper">
        <div class="form-row form-row-cardname">
          <label for="ccname">持卡人姓名</label>
          <input
            v-model="user.ccname"
            name="ccname"
            id="ccname"
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div class="form-row form-row-number">
          <label for="cccode">卡號</label>
          <input
            type="text"
            name="cccode"
            id="cccode"
            placeholder="1111 2222 3333 4444"
          />
        </div>
        <div class="form-row form-row-period">
          <label for="expdate">有效期限</label>
          <input
            v-model="user.expdate"
            name="expdate"
            id="expdate"
            type="text"
            placeholder="MM/YY"
          />
        </div>
        <div class="form-row form-row-code">
          <label for="cvv">CVC/CCV</label>
          <input
            v-model="user.cvv"
            name="cvv"
            id="cvv"
            type="text"
            placeholder="123"
          />
        </div>
      </div>
    </div>
    <div class="control-panel d-flex justify-content-between w-100">
      <router-link
        :to="{
          name: 'ShoppingCartCheckout',
          params: { step: currentStep - 1 },
        }"
        ><button class="btn-outline" v-show="currentStep !== 1">
          上一步
        </button></router-link
      >
      <router-link
        v-show="currentStep !== 3"
        :to="{
          name: 'ShoppingCartCheckout',
          params: { step: currentStep <= 2 ? currentStep + 1 : 3 },
        }"
        ><button class="btn-primary">下一步</button></router-link
      >
      <button
        v-show="currentStep === 3"
        @click.stop.prevent="handleSubmit"
        type="submit"
        class="btn-primary"
      >
        確認下單
      </button>
    </div>
  </form>
</template>

<script>
const STORAGE_KEY = "alpha-shop";

export default {
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("after-submit", {
        ...this.user,
      });
    },
    saveStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
    },
  },
  created() {
    this.user = this.initialUser;
  },
  watch: {
    user: {
      handler: function () {
        this.saveStorage();
      },
      deep: true,
    },
  },
};
</script>