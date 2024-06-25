<template>
  <div>
    <h2>Header</h2>
    <nav>
      <ul>
        <li @click="showPosts">Posts</li>
        <li @click="showTodos">Todos</li>
      </ul>
    </nav>
    <div v-if="selectedTab === 'posts'">
      <select v-model="selectedUser">
        <option v-for="user in users" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-for="post in filteredPosts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
    <div v-if="selectedTab === 'todos'">
      <!-- Include Todos component here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsComponent',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTab: 'posts',
      selectedUser: null,
      posts: []
    };
  },
  methods: {
    async showPosts() {
      this.selectedTab = 'posts';
      this.posts = await this.fetchPosts();
    },
    showTodos() {
      this.selectedTab = 'todos';
    },
    async fetchPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return response.json();
    }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => post.userId === parseInt(this.selectedUser));
    }
  }
};
</script>
