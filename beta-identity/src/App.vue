<script setup>
import Filters from './components/Filters.vue'
import Map from './components/Map.vue'
import Stories from './components/Stories.vue'
</script>

<template>
  <nav class="navbar">
    <img src="@/assets/logo-app.svg" alt="logo app" />
    <img src="@/assets/logo.svg" alt="logo app" />

    <a href="#">DESPRE PROIECT</a>
  </nav>

  <main>
    <Filters />
    <Map />
    <Stories />
  </main>
</template>

<style lang="scss" scoped>
nav.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 40px;
  border-bottom: 1px solid $border;
}

main {
  display: flex;
  position: relative;
}
</style>
