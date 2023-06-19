<template>
  <div class="home-container">
    <div class="main-content">
      <div class="articles-with-banner">
        <div class="side-view">
          <div class="categories-container mb-4">
            <h2>Status</h2>
            <a @click.prevent="filterAvailable()" href="#" class="btn btn-light status-button"> Available</a>
            <a @click.prevent="filterRequested()" href="#" class="btn btn-light status-button">Requested</a>
          </div>

          <div class="search-container">
            <h2>Search Book</h2>
            <div class="input-group search">
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                v-model="searchInput"
              />
              <button @click="fetchBooks()" type="button" class="btn btn-light">Search</button>
            </div>
          </div>
        </div>
        <div class="banner">
          <h1>ADOPT PRELOVED BOOKS!</h1>
        </div>
        <div class="articles">
            <Card v-for="(book, index) in books" :book="book" :index="index" />
        </div>
        
      </div>
      <div class="button-page">
          <button class="btn btn-light" @click="prevPage(), fetchBooks()" v-if="currentPage > 1">Prev</button> <button class="btn btn-light">{{ currentPage }}</button> <button class="btn btn-light"  @click="nextPage(), fetchBooks()" v-if="currentPage < totalPage">Next</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from 'pinia'
import { mapActions } from 'pinia'
import { useBukuKitaStore } from '../stores/bukukita'
import Card from '../components/Card.vue'

export default {
  components: {
    Card
  },
  computed: {
    ...mapState(useBukuKitaStore, ['isLogin', 'books', 'totalPage']),
    ...mapWritableState(useBukuKitaStore, ['searchInput', 'statusInput', 'currentPage'])
  },
  created() {
    this.fetchBooks()
  },
  methods: {
    ...mapActions(useBukuKitaStore, ['fetchBooks']),
    nextPage(){
      this.currentPage++
    },
    prevPage(){
      this.currentPage--
    },
    filterAvailable(){
        this.statusInput = 'Available'
        this.fetchBooks()
    },
    filterRequested(){
        this.statusInput = 'Requested'
        this.fetchBooks()
    }
  }
}
</script>
