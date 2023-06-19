<template>
<div class="request-container mt-5 mb-3">
          <div class="request-date">
            <p>{{new Date(request.createdAt).toDateString()}}</p>
          </div>
          <div class="mt-5">
            <span style="font-weight: bold">Message:</span>
            <p>{{request.message}}</p>
          </div>
          <div class="requester-data">
            <span style="font-weight: bold;">Requester Detail:</span>
            <ul>
              <li>{{request.User.email}}</li>
              <li>{{request.User.city}}</li>
              <li>{{request.User.phoneNumber}}</li>
            </ul>
          </div>
          <div class="request-button mt-3">
          <a href="#" @click.prevent="donateBook(request.id)" class="btn btn-dark" style="width: 450px;"> Donate </a>
        </div>
        </div>
</template>

<script>
import { useBukuKitaStore } from '../stores/bukukita'
import { mapWritableState } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'

export default {
    props: ['request', 'index'],
    methods: {
    ...mapActions(useBukuKitaStore, ['donateBook']),
  }
}
</script>