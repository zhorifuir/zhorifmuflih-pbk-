<template>
    <div class="q-pa-md app-container">
      <q-page padding>
        <q-card class="q-ma-md custom-card">
          <q-card-section>
            <h1 class="custom-title">Posts</h1>
            <q-btn-dropdown
              split
              class="glossy custom-btn-dropdown"
              color="dark"
              :label="selectedUserLabel"
              @click="clearSelection"
            >
              <q-list class="custom-list">
                <q-item
                  v-for="user in users"
                  :key="user.id"
                  clickable
                  v-close-popup
                  @click="onItemClick(user)"
                  class="custom-item"
                >
                  <q-item-section avatar>
                    <q-avatar icon="person" color="blue-10" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="custom-item-label">{{ user.name }}</q-item-label>
                    <q-item-label caption>{{ user.email }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="onItemClick(null)" class="custom-item">
                  <q-item-section avatar>
                    <q-avatar icon="clear" color="negative" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="custom-item-label">All Users</q-item-label>
                    <q-item-label caption>Clear selection</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-card-section>
          <q-card-section v-if="loading" class="custom-loading">
            Loading...
          </q-card-section>
          <q-card-section v-else>
            <q-list>
              <q-item v-for="post in filteredPosts" :key="post.id" class="custom-post-item">
                <q-item-section>
                  <q-item-label>
                    <h2 class="custom-post-title">{{ post.title }}</h2>
                  </q-item-label>
                  <q-item-label caption>{{ post.body }}</q-item-label>
                  <q-item-label caption>Author: {{ getUser(post.userId) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-page>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  
  export default {
    setup() {
      const $q = useQuasar();
      const posts = ref([]);
      const users = ref([]);
      const selectedUserId = ref(null);
      const loading = ref(true);
  
      const fetchData = async () => {
        try {
          const [postsResponse, usersResponse] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch("https://jsonplaceholder.typicode.com/users"),
          ]);
          posts.value = await postsResponse.json();
          users.value = await usersResponse.json();
        } catch (error) {
          $q.notify({ type: 'negative', message: 'Error fetching data' });
          console.error("Error fetching data:", error);
        } finally {
          loading.value = false;
        }
      };
  
      const getUser = (userId) => {
        const user = users.value.find(user => user.id === userId);
        return user ? user.name : "Unknown";
      };
  
      const onItemClick = (user) => {
        selectedUserId.value = user ? user.id : null;
      };
  
      const clearSelection = () => {
        selectedUserId.value = null;
      };
  
      onMounted(fetchData);
  
      return {
        posts,
        users,
        selectedUserId,
        loading,
        getUser,
        filteredPosts: computed(() => {
          if (!selectedUserId.value) return posts.value;
          return posts.value.filter(post => post.userId === selectedUserId.value);
        }),
        selectedUserLabel: computed(() => {
          const user = users.value.find(user => user.id === selectedUserId.value);
          return user ? user.name : "All Users";
        }),
        onItemClick,
        clearSelection,
      };
    },
  };
  </script>
  
  <style scoped>
  
  .custom-card {
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .custom-title {
    font-family: 'Roboto', sans-serif;
    color: #424242;
    margin-bottom: 20px;
    font-size: 30px;
    text-align: center;
  }
  
  .custom-btn-dropdown {
    width: 100%;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 500;
  }
  
  .custom-list {
    background-color: #ffffff;
  }
  
  .custom-item {
    margin: 8px 0;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }
  
  .custom-item:hover {
    background-color: #e3f2fd;
  }
  
  .custom-item-label {
    font-weight: bold;
    color: #424242;
  }
  
  .custom-loading {
    color: #424242;
    text-align: center;
    font-size: 18px;
  }
  
  .custom-post-item {
    margin-bottom: 25px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  
  .custom-post-title {
    color: #424242;
    margin: 0;
    font-size: 22px;
    font-family: 'Roboto', sans-serif;
  }
  
  .q-avatar {
    border-radius: 50%;
  }
  
  .q-chip {
    margin-top: 12px;
  }
  
  </style>
  
  