<template>
  <div class="stepper-panel">
    <h2>結帳</h2>
    <div
      class="
        stepper-container
        d-flex
        justify-content-between
        align-items-center
      "
    >
      <div class="steps" v-for="step in steps" :key="step.number">
        <div
          class="step"
          :class="[
            step.stepName,
            { active: step.active },
            { checked: step.checked },
          ]"
        >
          <div class="circle-container"></div>
          <div class="label-container d-none">{{ step.title }}</div>
        </div>
        <div class="connect-line" :class="step.lineName"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: {
      Type: Number,
      required: true,
    },
  },
  data() {
    return {
      steps: [
        {
          stepName: "step-one",
          lineName: "line-one",
          title: "寄送地址",
          number: 1,
          active: true,
          checked: false,
        },
        {
          stepName: "step-two",
          lineName: "line-two",
          title: "運送方式",
          number: 2,
          active: false,
          checked: false,
        },
        {
          stepName: "step-three",
          lineName: "line-three",
          title: "付款資訊",
          number: 3,
          active: false,
          checked: false,
        },
      ],
    };
  },
  created() {
    this.renderStepper(this.currentStep);
  },
  methods: {
    renderStepper(currentStep) {
      console.log(currentStep);
      if (currentStep === 1) {
        return this.steps;
      } else if (currentStep === 2) {
        this.steps = this.steps.map((step) => {
          if (step.number === 1) {
            return {
              ...step,
              checked: true,
            };
          } else if (step.number === 2) {
            return {
              ...step,
              active: true,
            };
          }
          return {
            ...step,
          };
        });
      } else {
        this.steps = this.steps.map((step) => {
          if (step.number === 1) {
            return {
              ...step,
              checked: true,
            };
          } else if (step.number === 2) {
            return {
              ...step,
              active: true,
              checked: true,
            };
          }
          return {
            ...step,
            active: true,
          };
        });
      }
    },
  },
  watch: {
    currentStep() {
      this.renderStepper(this.currentStep);
    },
  },
};
</script>