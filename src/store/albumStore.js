import { defineStore } from 'pinia';
import axios from 'axios';

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [],
    loading: false,
  }),
  actions: {
    async fetchAlbums() {
      this.loading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
