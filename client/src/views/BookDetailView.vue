<template>
  <div class="detail-container">
    <div class="detail-body">
      <div class="detail-article">
        <h1 style="font-weight: bold">{{ bookDetail.data.title }}</h1>

        <br />
        <h4>by {{ bookDetail.data.author }}</h4>
        <hr />
        <br />
        <img class="detailImage" :src="bookDetail.data.imgUrl" />
        <br />
        <br />
        <div class="detail-detail mt-3 mb-3">
          <p class="ad-category">{{ bookDetail.data.status }}</p>
          <p class="ad-category">{{ bookDetail.data.User.city }}</p>
        </div>
        <br>
        <br>
        <br>
        <h4 style="text-align: justify">Condition</h4>
        <p style="text-align: justify">{{ bookDetail.data.condition }}</p>

        <h4 style="text-align: justify" v-if="bookDetail.description != ''">Description</h4>
        <p style="text-align: justify">{{ bookDetail.description }}</p>

        <h5 style="text-align: justify">Added by: {{ bookDetail.data.User.name }}</h5>
      </div>
      <div class="qr-code">
        <img class="detailImage mb-3" :src="bookDetail.imageFromGoogle" /> 
        <hr>
        <p v-if="requesterIdList.includes(+userId)">You already requested this book</p>       
        <div v-if="requesterIdList.includes(+userId) == false" class="request-message mt-4" >
        <h4 class="mb-3" style="font-weight: bold">Request Book</h4>
        <textarea rows="4" cols="30" v-model="message" placeholder="Enter your message..."></textarea>
        <button
          @click.prevent="
            requestBook({
              message: this.message
            })
          "
          type="submit"
          class="btn btn-dark mb-3 mt-3"
          style="width: 250px;"
        >
          Request Book
        </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useBukuKitaStore } from '../stores/bukukita'
import { mapActions } from 'pinia'
import { mapWritableState } from 'pinia'

export default {
  components: {},
  computed: {
    ...mapState(useBukuKitaStore, ['bookDetail', 'requesterIdList', 'userId']),
    ...mapWritableState(useBukuKitaStore, ['bookId'])
  },
  methods: {
    ...mapActions(useBukuKitaStore, ['bookById', 'requestBook'])
  },
  data() {
    return {
      message: ''
    }
  },
  created() {
    this.bookId = this.$route.params.id
    this.bookById()
    console.log(this.bookDetail, '<<< book detail dari view')
  }
}
</script>
