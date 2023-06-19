<template>
  <div class="detail-container">
    <div class="detail-body">
      <div class="detail-article">
        <h1 style="font-weight: bold" class="mb-3">Request List</h1>
        <Request v-if="myBookById.data.status != 'Donated'" v-for="(request, index) in requestList" :request="request" :index="index"  />
        <RequestDonated v-if="myBookById.data.status == 'Donated'" v-for="(request, index) in requestList" :request="request" :index="index"  />
        <p v-if="requestList.length == 0">There's no request</p>
      </div>
      <div class="qr-code">
        <img class="detailImage" :src="myBookById.data.imgUrl" />
        <br />
       
        <h5 class="mb-4 mt-2">{{ myBookById.data.title }}</h5>
        <p class="ad-category">{{ myBookById.data.status }} <span v-if="myBookById.data.status == 'Donated'">to {{ myBookById.bookRecipient.email }}</span></p>
        <p style="text-align: justify">{{ myBookById.data.condition }}</p>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useBukuKitaStore } from '../stores/bukukita'
import { mapActions } from 'pinia'
import { mapWritableState } from 'pinia'
import Request from '../components/Request.vue'
import RequestDonated from '../components/RequestDonated.vue'

export default {
  components: {
    Request, RequestDonated
  },
  computed: {
    ...mapState(useBukuKitaStore, ['myBookById', 'requestList']),
    ...mapWritableState(useBukuKitaStore, ['bookId'])
  },
  methods: {
    ...mapActions(useBukuKitaStore, ['myBookDetail'])
  },
  data() {
    return {
        
    }
  },
  created() {
    this.bookId = this.$route.params.id
    this.myBookDetail()
    console.log(this.myBookById, '<<< book detail dari view')

  }
}
</script>
