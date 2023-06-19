import { defineStore } from 'pinia'
import axios from 'axios'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

export const useBukuKitaStore = defineStore('bukukita', {
  state: () => ({
    baseUrl: 'https://bukukita.siriusoya.site',
    isLogin: false,
    books: [],
    currentPage: 1,
    totalPage: 1,
    bookDetail: {},
    myBooks: [],
    bookId: null,
    searchInput: '',
    statusInput: null,
    myBooksIdList: [],
    myBookById: {},
    requestList: [],
    requesterIdList: [],
    userId: localStorage.id
  }),
  getters: {
    // doubleCount: (state) => state.count * 2
  },
  actions: {
    async loginHandler(payload) {
      try {
        let result = await axios({
          method: 'POST',
          url: this.baseUrl + '/login',
          data: payload
        })
        localStorage.setItem('access_token', result.data.access_token)
        localStorage.setItem('id', result.data.id)
        console.log(result.data.id, '<<< id dari result')
        this.isLogin = true
        this.router.push('/')
      } catch (err) {
        console.log(err, '<<<')
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    async signupHandler(payload) {
      try {
        await axios({
          method: 'POST',
          url: this.baseUrl + '/register',
          data: payload
        })
        this.router.push('/login')
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    async fetchBooks() {
      try {
        let { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/books',
          params: {
            page: this.currentPage,
            search: this.searchInput,
            status: this.statusInput
          }
        })
        this.books = data.data
        this.totalPage = data.totalPage
        console.log(this.books)
        console.log(this.currentPage)
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    async bookById() {
      try {
        let { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/books/' + this.bookId,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.bookDetail = data
        console.log(this.bookDetail, '<<< detail dari store')

        let listOfId = []

        data.data.BookRecipients.forEach((el) => {
          listOfId.push(el.RecipientId)
        })

        console.log(listOfId, '<<< list requester id')
        console.log(this.userId, '<<< userId')

        this.requesterIdList = listOfId
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    async fetchMyBooks() {
      try {
        let { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/myBooks',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.myBooks = data.data
        console.log(this.myBooks)
      } catch (err) {
        console.log(err, '<<<')
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    async addBook(payload) {
      try {
        await axios({
          method: 'POST',
          url: this.baseUrl + '/books',
          data: payload,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.router.push('/')
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    async requestBook(payload) {
      try {
        await axios({
          method: 'POST',
          url: this.baseUrl + '/requestBook/' + this.bookId,
          data: payload,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.router.push('/')
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    async myBookDetail() {
      try {
        let { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/myBooks/' + this.bookId,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.myBookById = data
        this.requestList = this.myBookById.data.BookRecipients

        console.log(this.myBookById.data.BookRecipients, '<<< request dari store')
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    async donateBook(BookRecipientId) {
      try {
        let { data } = await axios({
          method: 'PATCH',
          url: this.baseUrl + '/books/' + BookRecipientId + '/donated',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.router.push(`/myBooks`)
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    logout() {
      localStorage.clear()
      this.isLogin = false
    }
  }
})
