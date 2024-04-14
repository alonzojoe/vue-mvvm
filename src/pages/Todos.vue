<template>
  <div>
    <div class="row">
      <div class="col-12 text-align-center">
        <div class="d-flex align-items-center justify-content-center flex-column">
          <h1 class="my-3">Todos</h1>
          <div class="spinner-border my-5" v-if="isLoading">
            <span class="visually-hidden">Loading...</span>
          </div>

          <div v-else>
            <!-- <pre>{{ todos }}</pre> -->
            <div class="card mb-3" v-for="(todo, index) in todos" :index="index">
              <div class="card-body position-relative">
                <button class="btn btn-danger btn-sm py-1 px-2" @click="deleteTodo(todo)"
                  style="position: absolute; right: 0; top: 0;">x</button>
                <h5 class="card-title">{{ todo.id }}. {{ todo.title }}</h5>
                <div class="d-flex align-items-center justify-content-between">
                  <span>Status:</span>
                  <span class="badge" :class="todo.completed ? 'text-bg-primary' : 'text-bg-warning'
            ">{{
            todo.completed === true ? "Completed" : "On-Going"
                    }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import api from "@/api";
export default {
  setup() {
    const todos = ref([]);
    const isLoading = ref(false);
    const fetchTodos = async () => {
      try {
        isLoading.value = true;
        const response = await api.get("/todos", {});
        if (response.data.length > 0) {
          todos.value = response.data;
          isLoading.value = false;
        }
      } catch (error) {
        console.log(error.message);
        isLoading.value = false;
      }
    };

    const deleteTodo = (todo) => {
      let confirmation = confirm(`Are you sure to remove ${todo.title}`)

      if (!confirmation) return;

      todos.value = todos.value.filter((t) => t.id !== todo.id)

      return;
      const index = todos.value.findIndex((t) => t.id === todo.id)
      console.log(index)
      if (index !== -1) {
        todos.value.splice(index, 1)
      }

    }

    onMounted(async () => {
      await fetchTodos();
      const newPromise = new Promise((resolve, reject) => {
        let a = 1 + 1;
        if (a === 2) {
          resolve("successfully added");
        } else {
          reject("equation rejected");
        }
      });

      newPromise
        .then((message) => {
          console.log(`Then: ${message}`);
        })
        .catch((rejectMessage) => {
          console.log(`Catch: ${rejectMessage}`);
        });
    });

    onBeforeUnmount(() => {
      console.log("toos component is unmounting");
    });

    onUnmounted(() => {
      console.log("todos component is unmounted");
    });

    return { todos, isLoading, deleteTodo };
  },
};
</script>

<style scoped>
.card {
  width: 25rem !important;
}

@media screen and (max-width: 676px) {
  .card {
    width: 90vw !important;
  }
}
</style>
