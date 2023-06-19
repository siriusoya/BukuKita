<template>
<nav class="navbar navbar-light mb-5" style="background-color: #0b1a3f;">
        <div class="container-fluid display-flex">
          <div>
            <img
              class="m-auto d-inline-block align-text-top"
              src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/47932/blue-book-emoji-clipart-md.png"
              alt="Logo"
              width="30"
              height="24"
            />
            <RouterLink to="/" @click.prevent="clearQuery()" class="navbar-brand text-light" href="#">&nbsp; BukuKita</RouterLink>

        
          <RouterLink to="/" @click.prevent="clearQuery()" class="text-light add-margin-2" v-if="isLogin == true"> Home</RouterLink>
          <RouterLink to="/myBooks" class="text-light add-margin-2" v-if="isLogin == true"> My Books</RouterLink>
          <RouterLink to="/addBook" class="text-light add-margin-2" v-if="isLogin == true"> Add Book</RouterLink>
        </div>
        <div class="right-button">
          <RouterLink to="/login" class="float-right">
            <button class="btn btn-outline-light" v-if="isLogin == false">Log In</button>
          </RouterLink>
          <RouterLink to="/signup" class="float-right">
            <button class="btn btn-outline-light" v-if="isLogin == false">Sign Up</button>
          </RouterLink>
          <RouterLink to="/login" class="float-right">
            <button class="btn btn-outline-light" v-if="isLogin == true" @click="logout()">Log Out</button>
          </RouterLink>
          </div>
        </div>
      </nav>
</template>

<script>
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import { mapWritableState } from 'pinia'
import { useBukuKitaStore } from '../stores/bukukita'


export default {
  components: {
    
  },
  computed: {
    
    ...mapState(useBukuKitaStore, ['isLogin']),
    ...mapWritableState(useBukuKitaStore, ['searchInput', 'statusInput'])
    

  },
  methods: {
    ...mapActions(useBukuKitaStore, ['logout', 'fetchBooks']),
    clearQuery() {
      this.searchInput = '';
      this.statusInput = null;
      this.fetchBooks();
    }
  }
}
</script>