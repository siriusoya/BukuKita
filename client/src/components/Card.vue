<template>
  <div class="card" style="width: 19rem" @click="toDetail()">
    <img class="card-img-top" :src="book.imgUrl" alt="Card image cap" />
    <div class="card-body card-height">
      <div class="detail-flex">
      <p v-if="book.status == 'Available'" class="ad-category">{{ book.status }}</p>
      <p v-if="book.status == 'Requested'" class="ad-category">Total Requests: {{ book.BookRecipients.length }}</p>
      <p class="ad-category">{{ book.User.city }}</p>
    </div>
      <h5 class="card-title mt-3">
        {{ book.title }}
        <p v-if="book.BookRecipient" class="ad-category">{{ book.BookRecipients.length }}</p>
      </h5>
      <div class="card-content">
      <p>{{ book.author }}</p>
        <p class="book-owner">Added by: {{ book.User.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useBukuKitaStore } from '../stores/bukukita'
import { mapWritableState } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'

export default {
  components: {},
  computed: {
    ...mapWritableState(useBukuKitaStore, ['bookId']),
    ...mapState(useBukuKitaStore, ['isLogin', 'userId'])
  },
  props: ['book', 'index'],
  methods: {
    toDetail() {
      console.log('dapat idnya >>>', this.book.id)
      this.bookId = this.book.id
      if(localStorage.id == this.book.User.id) {
        this.$router.push(`/myBooks/${this.book.id}`)
      } else {
        this.$router.push(`/books/${this.book.id}`)
      }
      console.log(this.book.User.id, '<<< book user id')
      console.log(localStorage.id, '<<< user id')
    }
  }
}
</script>
