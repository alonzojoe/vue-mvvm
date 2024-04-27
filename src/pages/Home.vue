<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="card">
      <div class="card-body">
        <div class="card-title">Home Component {{ msg }}</div>
        <button @click="mutateCount('increment')">+</button>
        <span style="margin: 0 20px">{{ count }}</span>
        <button @click="mutateCount('decrement')">-</button>
        <p>Computed Property: {{ doubleCount }}</p>
      </div>
    </div>
    <input ref="myComponent" type="text" />
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "Joe",
      required: false,
    },
  },
  data() {
    return {
      count: 0,
      todo: [],
    };
  },
  methods: {
    mutateCount(type) {
      if (type === "increment") {
        this.count++;
      } else {
        this.count--;
      }
    },
    welcomeMessage(message) {
      console.log("message :", message);
    },
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    },
  },
  watch: {
    count(newValue, oldVaue) {
      console.log("new value: ", newValue);
      console.log("old value", oldVaue);
    },
  },
  beforeCreate() {
    console.log("before create", this.count);
  },
  created() {
    console.log("component is created i have access to count", this.count);
  },
  beforeMount() {
    console.log("compoentn before mounted");
  },
  mounted() {
    console.log("component is mounted");
    if (this.msg === "Joe") {
      console.log(this.msg);
    }
    this.$refs.myComponent.style.backgroundColor = "#fff";
    this.$refs.myComponent.style.color = "#000";
    this.$refs.myComponent.focus();
    this.welcomeMessage("welcome to home component");
  },
  beforeUpdate() {
    console.log(
      "componentb efore update count value in DOM still: 0 / initial"
    );
  },
  updated() {
    console.log("component is updated new count value is :", this.count);
  },
  beforeUnmount() {
    console.log("component is being remove in the DOM");
  },
  unmounted() {
    console.log("component has been removed from the DOM");
  },
};
</script>

<style lang="scss" scoped></style>
