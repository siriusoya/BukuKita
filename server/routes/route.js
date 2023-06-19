const router = require("express").Router()
const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const multer  = require('multer')
const multerUploads = require('../middlewares/multer')
const { cloudinaryConfig } = require('../config/cloudinaryConfig')




router.post('/register', Controller.register);

router.post('/login', Controller.login);

router.get('/books', Controller.bookList);

router.post('/bookImage', cloudinaryConfig, multerUploads, Controller.getBookImageFile)

router.use(authentication);

router.get('/books/:id', Controller.bookById);

router.post('/books', Controller.addBook);

router.get('/myBooks', Controller.myBooks);

router.get('/myBooks/:id', Controller.myBookDetail);

router.post('/requestBook/:id', Controller.requestBook);



router.patch('/books/:bookRecipientId/donated', authorization, Controller.donateBook);





module.exports = router