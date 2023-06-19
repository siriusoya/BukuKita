<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { mapWritableState } from 'pinia'
import { useBukuKitaStore } from './stores/bukukita'

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapWritableState(useBukuKitaStore, ['isLogin'])
  },
  created() {
    if(localStorage.access_token){
      this.isLogin = true;
    }
  }
}
</script>

<template>
  <Navbar />

  

  <RouterView />
</template>

<style scoped></style>
