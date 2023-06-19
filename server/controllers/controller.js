const { User, Book, BookRecipient } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Op } = require("sequelize");
const axios = require("axios");
const { uploader, cloudinaryConfig } = require("../config/cloudinaryConfig");

class Controller {
  static async register(req, res, next) {
    try {
      let { email, password, name, city, phoneNumber } = req.body;
      let newUser = await User.create({
        email,
        password,
        name,
        city,
        phoneNumber,
      });
      let data = {
        id: newUser.id,
        email: newUser.email,
      };
      res.status(201).json({
        message: "Succeeded registering a new user",
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      if (!req.body.email || !req.body.password) {
        throw { name: "EmailPasswordisRequired" };
      }

      const checkUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!checkUser) {
        throw { name: "UserNotFound" };
      }

      const isAuthenticated = comparePassword(
        req.body.password,
        checkUser.password
      );
      if (!isAuthenticated) {
        throw { name: "EmailPasswordInvalid" };
      }

      let payload = {
        id: checkUser.id,
      };

      const token = signToken(payload);

      res.status(200).json({
        message: "Login successful",
        access_token: token,
        id: checkUser.id,
      });
    } catch (err) {
      next(err);
    }
  }

  static bookList(req, res, next) {
    let statusValue;
    let search;

    if (!req.query.search) {
      search = "";
    } else {
      search = req.query.search;
    }

    if (!req.query.status) {
      statusValue = {
        [Op.or]: ["Available", "Requested"],
      };
    } else {
      statusValue = req.query.status;
    }

    let currentPage = +req.query.page;
    console.log(currentPage);
    let options = {
      include: [
        {
          model: User,
        attributes: { exclude: ["password"] }
      },
      {
        model: BookRecipient
      }
      ],
      order: [["createdAt", "DESC"]],
      where: {
        status: statusValue,
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
    };
    if (req.query.page) {
      options.offset = currentPage * 9 - 9;
      options.limit = 9;
    }

    Book.findAndCountAll(options)
      .then((data) => {
        console.log(data);
        let totalData = data.count;
        let totalPage = Math.ceil(totalData / 9);
        res.status(200).json({
          message: "Succeeded getting books data",
          data: data.rows,
          currentPage,
          totalData,
          totalPage,
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static async bookById(req, res, next) {
    try {
      console.log("masuk bookbyid")
      let options = {
        where: {
          id: +req.params.id,
        },
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: BookRecipient
          }
        ],
      };

      let book = await Book.findOne(options);
      if (!book) {
        throw { name: "NotFound" };
      } else {
        let bookDescription = "";
        let bookImage = "";
        let bookData = await axios({
          method: "GET",
          url:
            "https://www.googleapis.com/books/v1/volumes?q=isbn:" + book.isbn,
        });
        if (
          bookData &&
          bookData.data &&
          bookData.data.items &&
          bookData.data.items[0].volumeInfo
        ) {
          const { description, imageLinks } = bookData.data.items[0].volumeInfo;
          if (description) {
            bookDescription = description;
          }
          if (imageLinks) {
            bookImage = imageLinks.thumbnail;
          }
        }
        res.status(200).json({
          message: "Succeeded getting book data",
          data: book,
          description: bookDescription,
          imageFromGoogle: bookImage,
        });
      }
    } catch (err) {
      console.log("masuk bookbyid")
      console.log(err, '<<<');
      next(err);
    }
  }

  static addBook(req, res, next) {
    console.log("hello");
    let status = "Available";
    console.log(req.body);
    let { title, isbn, condition, imgUrl, author } = req.body;
    Book.create({
      title,
      isbn,
      condition,
      status,
      imgUrl,
      author,
      OwnerId: req.user.id,
    })
      .then((data) => {
        res.status(201).json({
          message: "Succeeded adding a new book",
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static myBooks(req, res, next) {
    Book.findAll({
      where: {
        OwnerId: req.user.id,
      },
      order: [['status', 'DESC']]
    })
      .then((data) => {
        res.status(200).json({
          message: "Succeeded getting my books data",
          data,
        });
      })
      .catch((err) => {
        next(err, '/\/\/');
      });
  }

  static async myBookDetail(req, res, next) {
    try {
      let options = {
        where: {
          id: +req.params.id,
        },
        include: {
          model: BookRecipient,
          include: {
            model: User,
            attributes: { exclude: ["password"] },
          },
        },
      };

      let book = await Book.findOne(options);
      if (!book) {
        throw { name: "NotFound" };
      } else {
        let bookRecipient = {};

        if(book.BookRecipientId) {
          bookRecipient = await User.findByPk(book.BookRecipientId)
        }

        book.BookNewOwner = bookRecipient

        res.status(200).json({
          message: "Succeeded getting book data",
          data: book,
          bookRecipient
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async donateBook(req, res, next) {
    try {
      console.log("sini ternyata")
      let status = "Donated";

      const bookRecipient = await BookRecipient.findByPk(
        +req.params.bookRecipientId
      );
      let BookRecipientId = bookRecipient.RecipientId;

      await Book.update(
        { status, BookRecipientId },
        {
          where: {
            id: bookRecipient.BookId,
          },
        }
      );

      res.status(200).json({
        message: "Succeeded donating book",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async requestBook(req, res, next) {
    try {
      let status = "Requested";

      let data = {
        RecipientId: req.user.id,
        BookId: req.params.id,
        message: req.body.message,
      };

      BookRecipient.create(data);

      await Book.update(
        { status },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.status(201).json({
        message: "Succeeded request book",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static getBookImageFile(req, res, next) {
    console.log(req.file, "<<< file img sduh");
    let fileBase64 = req.file.buffer.toString("base64");
    // console.log(req.req.file.mimetype, '<<< mimetype')
    if(req.file.mimetype === "image/png" || req.file.mimetype === "image/jpg" || req.file.mimetype === "image/jpeg"){
      let file = `data:${req.file.mimetype};base64,` +  fileBase64;
    // console.log(fileBase64, '<<< file base 64')
    // console.log(uploader)
    uploader
      .upload(file)
      .then((result) => {
        const image = result.url;
        return res.status(200).json({
          message: "Your image has been uploded successfully to cloudinary",
            image
        });
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      next({
        name: "WrongFileType"
      })
    }
    
  }
}

module.exports = Controller;
