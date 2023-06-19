<template>
  <div class="addBook-form bg-light">
    <h1 class="mb-2 mt-2 add-margin">Add Book</h1>
    <div class="mb-1 add-margin">
      <label style="font-weight: bold" for="title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        id="title"
        placeholder="Enter book title"
        v-model="title"
      />
    </div>
    <div class="mb-1 add-margin">
      <label style="font-weight: bold" for="title" class="form-label">Author</label>
      <input
        type="text"
        class="form-control"
        id="title"
        placeholder="Enter book author"
        v-model="author"
      />
    </div>
    <form class="add-margin">
      <label style="font-weight: bold" for="imgUrl" class="form-label">Image</label>
      <input
        type="file"
        @change="handleFileUpload"
        class="form-control"
        name="imgFile"
        placeholder="Enter book image URL"
      />
      <div class="imgUrl">
        <button button @click.prevent="uploadFile" class="mt-2">Upload</button>
        <br />
        <p id="linkUrl" style="word-wrap: break-word">{{ imgUrl }}</p>
      </div>
    </form>
    <div class="mb-1 add-margin">
      <label style="font-weight: bold" for="title" class="form-label">ISBN</label>
      <input
        type="text"
        class="form-control"
        id="title"
        placeholder="ex. 9786024122874"
        v-model="isbn"
      />
    </div>
    <div class="mb-1 add-margin">
      <label style="font-weight: bold" for="title" class="form-label">Condition</label>
      <input
        type="text"
        class="form-control"
        id="title"
        placeholder="Enter book condition"
        v-model="condition"
      />
    </div>
    <div class="mt-2 text-center d-grid gap-2 add-margin">
      <button
        @click.prevent="
          addBook({
            title: this.title,
            isbn: this.isbn,
            condition: this.condition,
            imgUrl: this.imgUrl,
            author: this.author
          })
        "
        type="submit"
        class="btn btn-dark mb-3"
      >
        Add Book
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import { useBukuKitaStore } from '../stores/bukukita'

export default {
  data() {
    return {
      title: '',
      isbn: '',
      condition: '',
      imgUrl: 'upload image first',
      author: '',
      selectedFile: ''
    }
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    ...mapActions(useBukuKitaStore, ['addBook']),

    handleFileUpload(event) {
      this.selectedFile = event.target.files[0]
    },

    async uploadFile() {
      console.log(this.selectedFile)
      this.imgUrl = 'is uploading...'
      let { data } = await axios.postForm('https://bukukita.siriusoya.site/bookImage', {
        image: this.selectedFile
      })
      this.imgUrl = data.image
      console.log(data)
      // axios
      //   .post('http://localhost:3000/bookImage', formData)
      //   .then((response) => {
      //     console.log('File uploaded successfully')
      //   })
      //   .catch((error) => {
      //     console.error('Error uploading file:', error)
      //   })
    }
  }
}
</script>
