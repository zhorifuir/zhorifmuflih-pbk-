<template>
    <div class="albums-container">
      <q-page padding>
        <q-card class="album-card">
          <q-card-section class="header-section">
            <h2 class="custom-title">Albums</h2>
          </q-card-section>
          <q-card-section v-if="loading" class="loading-section">
            <q-spinner color="primary" />
            <p class="loading-text">Loading...</p>
          </q-card-section>
          <q-card-section v-else class="list-section">
            <q-list class="custom-list">
              <q-item
                v-for="album in albums"
                :key="album.id"
                clickable
                v-ripple
                @click="viewAlbum(album.id)"
                class="custom-item"
              >
                <q-item-section>
                  <q-item-label class="custom-item-title">{{ album.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-page>
    </div>
  </template>
  
  <script>
  import { useAlbumStore } from '../store/albumStore';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Album',
    setup() {
      const albumStore = useAlbumStore();
      const router = useRouter();
  
      const albums = ref([]);
      const loading = ref(false);
  
      onMounted(() => {
        loading.value = true;
        albumStore.fetchAlbums().then(() => {
          loading.value = false;
          albums.value = albumStore.albums;
        });
      });
  
      const viewAlbum = (albumId) => {
        router.push(`/albums/${albumId}`);
      };
  
      return {
        albums,
        loading,
        viewAlbum,
      };
    },
  };
  </script>
  
  <style scoped>
  
  .album-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    margin: auto;
  }
  
  .header-section {
    background: #424242;
    color: #ffffff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 20px;
    text-align: center;
  }
  
  .custom-title {
    font-family: 'Roboto', sans-serif;
    font-size: 2em;
    margin: 0;
  }
  
  .loading-section {
    text-align: center;
    padding: 40px 0;
  }
  
  .loading-text {
    color: #424242;
    font-size: 1.2em;
    margin-top: 10px;
  }
  
  .list-section {
    padding: 20px;
  }
  
  .custom-list {
    margin: 0;
  }
  
  .custom-item {
    margin-bottom: 12px;
    border-radius: 8px;
    padding: 10px 20px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .custom-item:hover {
    background-color: #e0f7fa;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .custom-item-title {
    font-size: 1.3em;
    color: #424242;
    font-weight: 500;
  }
  </style>
  