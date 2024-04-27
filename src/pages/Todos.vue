<template>
  <div>
    <div class="row">
      <div class="col-12 text-align-center">
        <div
          class="d-flex align-items-center justify-content-center flex-column"
        >
          <h1 class="my-3">Todos</h1>
          <div class="spinner-border my-5" v-if="isLoading">
            <span class="visually-hidden">Loading...</span>
          </div>

          <div v-else>
            <!-- <pre>{{ todos }}</pre> -->
            <div
              class="card mb-3"
              v-for="(todo, index) in todos"
              :index="index"
            >
              <div class="card-body position-relative">
                <button
                  class="btn btn-danger btn-sm py-1 px-2"
                  @click="deleteTodo(todo)"
                  style="position: absolute; right: 0; top: 0"
                >
                  x
                </button>
                <h5 class="card-title">{{ todo.id }}. {{ todo.title }}</h5>
                <div class="d-flex align-items-center justify-content-between">
                  <span>Status:</span>
                  <span
                    class="badge"
                    :class="
                      todo.completed ? 'text-bg-primary' : 'text-bg-warning'
                    "
                    >{{
                      todo.completed === true ? "Completed" : "On-Going"
                    }}</span
                  >
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
      let confirmation = confirm(`Are you sure to remove ${todo.title}`);

      if (!confirmation) return;

      todos.value = todos.value.filter((t) => t.id !== todo.id);

      return;
      const index = todos.value.findIndex((t) => t.id === todo.id);
      console.log(index);
      if (index !== -1) {
        todos.value.splice(index, 1);
      }
    };

    let items = [14, 78, 34, 71, 69, 173];
    const findHighestItem = (items) => {
      let lowest = items[0];

      for (let index = 1; index < items.length; index++) {
        if (items[index] < lowest) {
          lowest = items[index];
        }
      }

      console.log("hghest", lowest);
    };

    const arrReduce = () => {
      const items = [1, 2, 3];

      const totalItems = items.reduce((total, item) => {
        return total + item;
      }, 0);

      console.log("array reduce single array", totalItems);
    };

    const reduceArrObjects = () => {
      const items = [
        { name: "Rice", price: 45 },
        { name: "Coke", price: 25 },
        { name: "Load", price: 50 },
        { name: "T-Shirt", price: 150 },
      ];

      const totalPrice = items.reduce((total, item) => {
        return total + item.price;
      }, 0);
      console.log("array reduce arr of objects total:", totalPrice);
    };

    const mergedObjects = () => {
      const requests = [
        { requestID: 134, department: "Billing" },
        { requestID: 135, department: "Accounting" },
        { requestID: 136, department: "HR" },
        { requestID: 137, department: "Accounting" },
      ];

      const mergedRequests = requests.reduce((item, req) => {
        if (!item[req.department]) {
          item[req.department] = req;
        }
        return item;
      }, {});

      console.log("reduce merge departments", Object.values(mergedRequests));
    };

    const groupAges = () => {
      const persons = [
        { name: "John", age: 28 },
        { name: "Jane", age: 25 },
        { name: "Tom", age: 39 },
        { name: "Mary", age: 25 },
        { name: "Mirna", age: 28 },
      ];

      const groupPersons = persons.reduce((group, person) => {
        if (!group[person.age]) group[person.age] = [];

        group[person.age].push(person.name);

        return group;
      }, {});

      console.log("Array reduce grouping persons by age", groupPersons);
    };
    const sales = ref([
      { employeeId: 1, amount: 100 },
      { employeeId: 2, amount: 200 },
      { employeeId: 1, amount: 150 },
      { employeeId: 3, amount: 300 },
    ]);

    const customers = ref([
      { customerId: 101, employeeId: 1 },
      { customerId: 102, employeeId: 2 },
      { customerId: 103, employeeId: 1 },
      { customerId: 104, employeeId: 3 },
    ]);

    const calculateCustomerSales = (sales, customers) => {
      const totalSales = {};

      sales.value.forEach((sale) => {
        const customer = customers.value.find(
          (customer) => customer.employeeId === sale.employeeId
        );

        if (customer) {
          totalSales[sale.employeeId] =
            (totalSales[sale.employeeId] || 0) + sale.amount;
        }
      });
      console.log("total sales", totalSales);
      return totalSales;
    };

    const jsDates = () => {
      console.clear();
      //new Date format(year, month, hour, minute, second, millisecond )
      //for month it starts with 0;
      //for time military
      //argument Date(2024, 0, 1, 2, 3, 4, 5);
      //new arg Date("2024-01-02T12:00:00Z");
      const newDate = new Date();
      console.log("Javascript Dates", newDate);
      console.log("Year", newDate.getFullYear());
      console.log("Month", newDate.getMonth());
      console.log("Day", newDate.getDate()); //returns numeric

      //time
      console.log("Hour", newDate.getHours());
      console.log("Minute", newDate.getMinutes());
      console.log("Seconds", newDate.getSeconds());

      //day of week //sunday = 0, monday =1
      console.log("Day of Week", newDate.getDay());

      //formatter
      console.log("localeString", newDate.toLocaleString("en-us"));
      const formatter = Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "full",
      });

      console.log("formatted", formatter.format(newDate));
    };

    onMounted(async () => {
      await fetchTodos();
      findHighestItem(items);
      const newPromise = new Promise((resolve, reject) => {
        let a = 1 + 1;
        if (a === 2) {
          resolve("successfully added");
        } else {
          reject("equation rejected");
        }
      });

      await newPromise
        .then((message) => {
          console.log(`Then: ${message}`);
        })
        .catch((rejectMessage) => {
          console.log(`Catch: ${rejectMessage}`);
        });

      console.clear();
      arrReduce();
      reduceArrObjects();
      mergedObjects();
      groupAges();

      calculateCustomerSales(sales, customers);
      jsDates();
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
