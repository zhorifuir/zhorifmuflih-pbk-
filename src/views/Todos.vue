<template>
    <q-page class="flex flex-center">
      <q-card class="q-pa-md q-my-lg custom-card">
        <q-card-section>
          <h4 class="text-center custom-title">Toko HP Dobleh</h4>
          <q-input
            v-model="newTodo"
            @keyup.enter="addTodo"
            placeholder="Masukkan merk hp"
            outlined
            class="q-my-md custom-input"
          >
            <template v-slot:append>
              <q-btn @click="addTodo" label="Add" color="dark" class="custom-add-btn" />
            </template>
          </q-input>
          <q-list bordered class="q-my-md custom-list">
            <q-item v-for="(todo, index) in filteredTodos" :key="index" clickable class="custom-item">
              <q-item-section>
                <q-checkbox v-model="todo.completed" />
              </q-item-section>
              <q-item-section>
                <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
              </q-item-section>
              <q-item-section side>
                <q-btn @click="removeTodo(index)" color="dark" flat icon="delete" class="custom-delete-btn" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-card-actions align="around">
            <p class="total-todos">Total todos: {{ totalTodos }}</p>
            <q-btn @click="toggleFilter" :label="filterButtonText" color="dark" class="custom-filter-btn" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useTodoStore } from "../store/todoStore";
  import { QPage, QCard, QCardSection, QInput, QBtn, QList, QItem, QItemSection, QCheckbox, QCardActions } from "quasar";
  
  export default {
    components: {
      QPage,
      QCard,
      QCardSection,
      QInput,
      QBtn,
      QList,
      QItem,
      QItemSection,
      QCheckbox,
      QCardActions,
    },
    setup() {
      const newTodo = ref("");
      const todoStore = useTodoStore();
  
      const addTodo = () => {
        if (newTodo.value.trim() !== "") {
          todoStore.addTodo(newTodo.value);
          newTodo.value = "";
        }
      };
  
      const removeTodo = (index) => {
        todoStore.removeTodo(index);
      };
  
      const toggleFilter = () => {
        todoStore.toggleFilter();
      };
  
      return {
        newTodo,
        addTodo,
        removeTodo,
        toggleFilter,
        remainingCount: computed(() => todoStore.remainingCount),
        filteredTodos: computed(() => todoStore.filteredTodos),
        filterButtonText: computed(() => todoStore.filterButtonText),
        totalTodos: computed(() => todoStore.totalTodos), // New computed property for total todos
      };
    },
  };
  </script>
  
  <style scoped>
  .custom-card {
    max-width: 450px;
    width: 100%;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
  }
  
  .custom-title {
    text-align: center;
    color: #4a4a4a;
    margin-bottom: 20px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
  }
  
  .custom-input {
    border-radius: 12px;
  }
  
  .custom-add-btn {
    border-radius: 0 12px 12px 0;
    background-color: #6200ea;
    color: #fff;
    box-shadow: 0 4px 8px rgba(98, 0, 234, 0.3);
  }
  
  .custom-add-btn:hover {
    background-color: #3700b3;
  }
  
  .custom-list {
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .custom-item {
    transition: background-color 0.3s ease;
    padding: 12px;
  }
  
  .custom-item:hover {
    background-color: #f0f0f0;
  }
  
  .completed {
    text-decoration: line-through;
    color: #9e9e9e;
  }
  
  .custom-delete-btn {
    color: #ff1744;
  }
  
  .custom-delete-btn:hover {
    color: #d50000;
  }
  
  .custom-filter-btn {
    background-color: #03dac6;
    color: #000;
  }
  
  .custom-filter-btn:hover {
    background-color: #018786;
    color: #fff;
  }
  
  .total-todos {
    margin: 0;
    font-weight: bold;
    color: #333;
  }
  </style>
  