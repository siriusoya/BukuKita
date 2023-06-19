<template>
  <div class="home-container">
    <div class="main-content">
      <div class="articles-with-banner">

        <div class="banner mt-3">
          <h1>READY TO FIND NEW OWNERS</h1>
        </div>
        <div class="articles">
            <MyBooksCard v-for="(el, index) in myBooks" :el="el" :index="index" />
        </div>
        <p v-if="myBooks.length == 0" style="text-align: center;">Your book list is empty.</p>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import { useBukuKitaStore } from '../stores/bukukita'
import MyBooksCard from '../components/MyBooksCard.vue'

export default {
  components: {
    MyBooksCard
  },
  computed: {
    ...mapState(useBukuKitaStore, ['myBooks'])
  },
  created() {
    this.fetchMyBooks()
    console.log(this.myBooks, '<<<')
  },
  methods: {
    ...mapActions(useBukuKitaStore, ['fetchMyBooks'])
  }
}
</script>
