<template>
  <!-- Sign Up-->

  <div class="login-page">
    <div class="tagline">
      <div class="tagline-content">
        <h1>Welcome to BukuKita!</h1>
        <h5>Sign up to donate or get preloved books</h5>
      </div>
    </div>

    <div class="signup-form bg-light">
      <h1 class="mb-3">Sign Up</h1>
      <div class="mb-1">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter your email address"
          v-model="email"
        />
      </div>
      <div class="mb-1">
        <label for="inputPassword5" class="form-label">Password</label>
        <input
          type="password"
          id="inputPassword5"
          class="form-control"
          placeholder="Enter your password"
          v-model="password"
        />
      </div>
      <div class="mb-1">
        <label for="inputPassword5" class="form-label">Name</label>
        <input
          type="text"
          id="inputPassword5"
          class="form-control"
          placeholder="Enter your name"
          v-model="name"
        />
      </div>
      <div class="mb-1">
        <label for="inputPassword5" class="form-label">City/Regency</label>
        <input
          type="text"
          id="inputPassword5"
          class="form-control"
          placeholder="Enter your city/regency"
          v-model="city"
        />
      </div>
      <div class="">
        <label for="inputPassword5" class="form-label">Phone Number</label>
        <input
          type="text"
          id="inputPassword5"
          class="form-control"
          placeholder="Enter your phone number"
          v-model="phoneNumber"
        />
      </div>
      <div class="mt-2 text-center d-grid gap-2">
        <button
          @click.prevent="
            signupHandler({
              email: this.email,
              password: this.password,
              name: this.name,
              city: this.city,
              phoneNumber: this.phoneNumber
            })
          "
          type="submit"
          class="btn btn-dark mb-3 mt-3"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>

  <!-- End Sign Up -->
</template>

<script>
import { mapActions } from 'pinia'
import { useBukuKitaStore } from '../stores/bukukita'

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      city: '',
      phoneNumber: ''
    }
  },
  components: {},
  computed: {},
  methods: {
    ...mapActions(useBukuKitaStore, ['signupHandler'])
  }
}
</script>
