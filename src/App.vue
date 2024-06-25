<template>
  <div id="app">
    <q-layout view="hHh lpR fFf">
      <q-header class="bg-black text-white" elevated height="100px">
        <q-toolbar class="toolbar-custom">
          <q-toolbar-title class="header-title">
            My App
          </q-toolbar-title>
          <div class="tabs-container">
            <q-tabs
              class="text-white"
              align="right"
              dense
              active-color="white"
            >
              <q-route-tab to="/" label="Todos" />
              <q-route-tab to="/post" label="Post" />
              <q-route-tab to="/album" label="Album" />
            </q-tabs>
          </div>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer class="bg-black text-white" height="60px">
        <div class="text-center footer-text">
          © 2024 My App
        </div>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.q-page-container {
  background-image: url('https://i.pinimg.com/564x/5c/1d/09/5c1d09152f4b3f7d201cb4d6866d0888.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Set tinggi minimal sebesar tinggi viewport (100% viewport height) */
}
#app {
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.q-header {
  text-align: left; /* Align header content to the left */
}

.q-footer {
  padding: 10px 0;
}

.header-title {
  font-family: 'Times New Roman', Times, serif;
  font-size: 24px; /* Adjust the font size for the header title */
}

.footer-text {
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px; /* Adjust the font size for the footer text */
}

.toolbar-custom {
  justify-content: space-between; /* Space between title and tabs */
}

.tabs-container {
  margin-top: 10px; /* Adjust the margin to move the tabs down */
  margin-right: 20px; /* Adjust right margin if needed */
}
</style>
