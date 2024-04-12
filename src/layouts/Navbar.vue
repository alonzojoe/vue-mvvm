<template>
  <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid d-flex justify-content-between">
      <a class="navbar-brand" href="">VMMW</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-for="(m, index) in menus" class="nav-item" :index="index">
            <router-link
              :to="{ name: m.name }"
              class="nav-link"
              :class="{ active: route.name === m.name }"
              aria-current="page"
              >{{ m.title }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  name: "Navbar",
  setup() {
    const route = useRoute();

    const menus = [
      {
        name: "home",
        title: "Home",
      },
      {
        name: "todos",
        title: "Todos",
      },
    ];

    return { route, menus };
  },
};
</script>

<style scoped>
ul > li .nav-link.active {
  font-weight: bolder !important;
  position: relative;
}

ul > li .nav-link.active::after {
  position: absolute;
  content: "";
  left: 25%;
  bottom: -2px;
  height: 3px;
  width: 100%;
  background: #ff9900;
  transform: translateX(-25%);
}
</style>
