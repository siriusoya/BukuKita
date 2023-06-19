<template>
  <div class="card" style="width: 19rem" @click="toMyBookDetail()">
    <img class="card-img-top" :src="el.imgUrl" alt="Card image cap" />
    <div class="card-body card-height">
      <div class="detail-flex">
        <p class="ad-category">{{ el.status }}</p>
      </div>
      <h5 class="card-title mt-3">
        {{ el.title }}
      </h5>
      <div class="card-content">
        <p>{{ el.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useBukuKitaStore } from '../stores/bukukita'
import { mapWritableState } from 'pinia'
import { mapState } from 'pinia'

export default {
  components: {},
  computed: {
    ...mapWritableState(useBukuKitaStore, ['bookId']),
    ...mapState(useBukuKitaStore, ['isLogin'])
  },
  props: ['el', 'index'],
  methods: {
    toMyBookDetail() {
      console.log('dapat idnya >>>', this.el.id)
      this.bookId = this.el.id
      this.$router.push(`/myBooks/${this.el.id}`)
      console.log(this.bookId)
    }
  }
}
</script>
