const { BookRecipient, Book } = require('../models')

async function authorization(req, res, next) {
    try {
        let userId = req.user.id;

        console.log(userId, '<<< user id')

        let bookRecipient = await BookRecipient.findByPk(req.params.bookRecipientId)

        console.log(bookRecipient.BookId, '<<< book id')
        const book = await Book.findByPk(bookRecipient.BookId)

        if(!book) {
            throw { name: 'NotFound' }
        }

        if(userId != book.OwnerId) {
            throw { name: 'Unauthorized' }
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authorization;