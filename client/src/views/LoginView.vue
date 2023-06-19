<template>
<!-- Login -->
<div class="login-page">
        <div class="tagline">
          <div class="tagline-content">
            <h1>Welcome to BukuKita!</h1>
            <h5>Please sign in to continue</h5>
          </div>
        </div>

        <div class="login-form bg-light">
          <h1 class="mb-3 add-margin">Sign In</h1>
          <div class="mb-3 add-margin">
            <label for="exampleFormControlInput1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter your email address"
              v-model="email"
            />
          </div>
          <div class="mb-3 add-margin">
            <label for="inputPassword5" class="form-label">Password</label>
            <input
              type="password"
              id="inputPassword5"
              class="form-control"
              placeholder="Enter your password"
              v-model="password"
            />
          </div>
          <div class="mt-2 text-center d-grid gap-2 add-margin">
            <button @click.prevent="loginHandler({email: this.email, password: this.password})" type="submit" class="btn btn-dark mb-3">Sign In</button>
          </div>
        </div>
      </div>
      <!-- End Login -->
</template>

<script>
import { mapState } from 'pinia'
import { useBukuKitaStore } from '../stores/bukukita'
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    
  },
  computed: {
    
    
    

  },
  methods: {
    ...mapActions(useBukuKitaStore, ['loginHandler']),
  }
  
}
</script>