<template>
    <div>
      <h2>Album Detail</h2>
  
      <q-btn to="/album" label="Back to Albums" icon="arrow_back" class="back-button" />
  
      <div class="photos">
        <q-card class="photo" v-for="photo in photos" :key="photo.id">
          <q-img :src="photo.thumbnailUrl" @click="showFullSize(photo.url)">
            <div class="absolute-bottom text-h6 photo-description">
              {{ photo.title }}
            </div>
          </q-img>
        </q-card>
      </div>
  
      <!-- Modal untuk menampilkan foto dalam ukuran penuh -->
      <div class="modal" v-if="modalOpen">
        <div class="modal-content">
          <q-btn icon="close" @click="closeModal" class="close-btn" />
          <img :src="fullSizeUrl" alt="Full Size Photo" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { QCard, QImg, QBtn } from 'quasar';
  
  export default {
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        photos: [],
        modalOpen: false,
        fullSizeUrl: "",
      };
    },
    created() {
      this.fetchPhotos();
    },
    methods: {
      fetchPhotos() {
        axios
          .get(`https://jsonplaceholder.typicode.com/photos?albumId=${this.id}`)
          .then((response) => {
            this.photos = response.data;
          })
          .catch((error) => {
            console.error("Error fetching photos:", error);
          });
      },
      showFullSize(url) {
        this.fullSizeUrl = url;
        this.modalOpen = true;
      },
      closeModal() {
        this.modalOpen = false;
      },
    },
    components: {
      QCard,
      QImg,
      QBtn,
    },
  };
  </script>
  
  <style scoped>
  h2 {
    font-size: 1.5em;
    color:white;
  }
  .back-button {
    margin-bottom: 20px;
    color:white;
  }
  .photos {
    display: flex;
    flex-wrap: wrap;
  }
  .photo {
    width: 200px;
    margin: 10px;
    cursor: pointer;
  }
  .photo-description {
    margin-top: 5px;
    text-align: center;
    font-size: 0.9em;
    color: white;
  }
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
  }
  
  .modal-content {
    position: relative;
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }
  
  .modal-content img {
    width: 100%;
    height: auto;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    background-color: transparent;
  }
  </style>
  