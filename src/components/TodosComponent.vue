<template>
  <div>
    <h2>Todos</h2>
    <slot v-for="user in users" :user="user" :key="user.id">
      <!-- Default content in case the slot is not provided -->
      <div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'TodosComponent',
  props: {
    users: {
      type: Array,
      required: true
    }
  }
};
</script>
