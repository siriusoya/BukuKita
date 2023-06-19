module.exports = (err, req, res, next) => {
  let status;
  let message;

  console.log(err)

  switch (err.name) {
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;

    case "Unauthorized":
      status = 403;
      message = "You are not authorized";
      break;

    case "NotFound":
      status = 404;
      message = "Book not found";
      break;

    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;

    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;

    case "EmailPasswordisRequired":
      status = 400;
      message = "Email and password is required";
      break;

    case "WrongFileType":
      status = 400;
      message = "File type is not allowed";
      break;

    case "UserNotFound":
    case "EmailPasswordInvalid":
      status = 401;
      message = "Email or password is invalid";
      break;

    default:
      status = 500;
      message = "Internal server error";
      break;
  }

  res.status(status).json({ message });
};
