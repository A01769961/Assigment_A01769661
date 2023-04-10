<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-layout>
      <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer class="d-none d-sm-block" />
      <!-- <div class="ml-auto">
        <RouterLink class="whiteboton pa-4" to="/home">INICIO</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/lista">LISTA DE MATERIAS</RouterLink>
      </div> -->
      <RouterLink class="whiteboton pa-4" to="/">INICO DE SESION</RouterLink>
      <RouterLink class="whiteboton pa-4" to="/home">INICIO</RouterLink>
      <!-- <RouterLink class="whiteboton pa-4" to="/lista">LISTA DE MATERIAS</RouterLink> -->
      </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

  </v-layout>
</template>

<style scoped>
.whiteboton {
  font-weight: bold;
  color: white;
}

.logo {
  max-width: 10rem;
}
</style>
