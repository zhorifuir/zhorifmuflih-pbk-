<template>
  <div>
    <nav>
      <ul>
        <li>
          <a href="#" @click="setActiveFeature('TodosComponent')">Todos</a>
        </li>
        <li>
          <a href="#" @click="setActiveFeature('PostsComponent')">Posts</a>
        </li>
      </ul>
    </nav>
    <component :is="activeFeature" :users="users">
      <template #default="{ user }">
        <div>
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </template>
    </component>
  </div>
</template>

<script>
import TodosComponent from './components/TodosComponent.vue';
import PostsComponent from './components/PostsComponent.vue';

export default {
  name: 'App',
  components: { TodosComponent, PostsComponent },
  data() {
    return {
      activeFeature: 'TodosComponent',
      users: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        });
    },
    setActiveFeature(feature) {
      this.activeFeature = feature;
    }
  }
};
</script>
