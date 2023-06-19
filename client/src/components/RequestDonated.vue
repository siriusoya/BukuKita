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
            </div>
    </template>
    
    <script>
    export default {
        props: ['request', 'index'],
    }
    </script>