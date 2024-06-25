import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
    showCompleted: true,
  }),
  getters: {
    remainingCount: (state) =>
      state.todos.filter((todo) => !todo.completed).length,
    filteredTodos: (state) => {
      if (state.showCompleted) {
        return state.todos;
      }
      return state.todos.filter((todo) => !todo.completed);
    },
    filterButtonText: (state) =>
      state.showCompleted ? "Hide Completed" : "Show Completed",
    totalTodos: (state) => state.todos.length, // New getter for total todos
  },
  actions: {
    addTodo(newTodo) {
      if (newTodo.trim() !== "") {
        this.todos.push({ text: newTodo, completed: false });
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleFilter() {
      this.showCompleted = !this.showCompleted;
    },
  },
});
