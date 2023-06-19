# Flash API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /books`
- `GET /books/:id`
- `POST /books`
- `GET /myBooks`
- `GET /myBook/:id`
- `POST /requestBook/:id`
- `PATCH /books/:bookRecipientId`

&nbsp;

## 1. POST /register

Description:
- Create a new user data

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Invalid email format!"
}
OR
{
  "message": "Email has been registered!"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Password length must be more than 5!"
}
```

&nbsp;

## 2. POST /login

Description:
- Give authentication to registered user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login successful",
  "access_token": "string",
  "id": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Password is required!"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password!"
}
```

&nbsp;

## 3. GET /books

Description:
- Get all available and requested books from database

_Response (200 - OK)_

```json
{
     "message": "Succeeded getting books data",
    "data": [
        {
            "id": 3,
            "OwnerId": 1,
            "BookRecipientId": null,
            "status": "Requested",
            "title": "And Then There Were None",
            "author": "Agatha Christie",
            "isbn": "9781628992199",
            "condition": "Ada halaman hilang",
            "imgUrl": "https://m.media-amazon.com/images/I/51W7ynoiRsL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
            "createdAt": "2023-06-06T13:48:19.087Z",
            "updatedAt": "2023-06-06T14:22:44.273Z",
            "User": {
                "id": 1,
                "email": "test@gmail.com",
                "name": "test",
                "city": "Medan",
                "phoneNumber": "6658372523",
                "createdAt": "2023-06-06T13:48:18.270Z",
                "updatedAt": "2023-06-06T13:48:18.270Z"
            }
        },
        {
            "id": 2,
            "OwnerId": 1,
            "BookRecipientId": null,
            "status": "Available",
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "J.K. Rowling",
            "isbn": "9788869183157",
            "condition": "Baik",
            "imgUrl": "https://pictures.abebooks.com/isbn/9788869183157-us.jpg",
            "createdAt": "2023-06-06T13:48:19.087Z",
            "updatedAt": "2023-06-06T13:48:19.087Z",
            "User": {
                "id": 1,
                "email": "test@gmail.com",
                "name": "test",
                "city": "Medan",
                "phoneNumber": "6658372523",
                "createdAt": "2023-06-06T13:48:18.270Z",
                "updatedAt": "2023-06-06T13:48:18.270Z"
            }
        }
        ...,
    ]
}
```

&nbsp;

## 4. GET /books/:id

Description:
- Get book data by id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Succeeded getting book data",
    "data": {
        "id": 6,
        "OwnerId": 3,
        "BookRecipientId": null,
        "status": "Available",
        "title": "The Tale of Peter Rabbit",
        "author": "Beatrix Potter",
        "isbn": "9780721410180",
        "condition": "Baik",
        "imgUrl": "https://pictures.abebooks.com/inventory/22585118102.jpg",
        "createdAt": "2023-06-06T13:48:19.087Z",
        "updatedAt": "2023-06-06T13:48:19.087Z",
        "User": {
            "id": 3,
            "email": "rprobart0@miibeian.gov.cn",
            "name": "clane2",
            "city": "Jakarta",
            "phoneNumber": "5377985608",
            "createdAt": "2023-06-06T13:48:18.635Z",
            "updatedAt": "2023-06-06T13:48:18.635Z"
        }
    },
    "description": "Peter disobeys his mother by going into Mr. McGregor's garden and almost gets caught."
}
```

Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## 5. POST /books

Description:
- Create a new book data

Request:

- body:

```json
{
  "title": "string",
  "isbn": "string",
  "condition": "string",
  "imgUrl": "string",
  "author": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "Succeeded adding a new book",
    "data": {
        "id": "integer",
        "title": "string",
        "isbn": "string",
        "condition": "sedih",
        "status": "Available",
        "imgUrl": "string",
        "author": "string",
        "OwnerId": "integer",
        "updatedAt": "date",
        "createdAt": "date",
        "BookRecipientId": null
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required!"
}
OR
{
  "message": "ISBN is required!"
}
```

&nbsp;

## 6. GET /myBooks

Description:
- Get all books created by user

_Response (200 - OK)_

```json
{
    "message": "Succeeded getting my books data",
    "data": [
        {
            "id": 1,
            "OwnerId": 1,
            "BookRecipientId": null,
            "status": "Available",
            "title": "A Tale of Two Cities",
            "author": "Charles Dickens",
            "isbn": "9780582030473",
            "condition": "Baik",
            "imgUrl": "https://images-na.ssl-images-amazon.com/images/I/41WY82WVS0L.jpg",
            "createdAt": "2023-06-06T13:48:19.087Z",
            "updatedAt": "2023-06-06T13:48:19.087Z"
        },
        {
            "id": 2,
            "OwnerId": 1,
            "BookRecipientId": null,
            "status": "Available",
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "J.K. Rowling",
            "isbn": "9788869183157",
            "condition": "Baik",
            "imgUrl": "https://pictures.abebooks.com/isbn/9788869183157-us.jpg",
            "createdAt": "2023-06-06T13:48:19.087Z",
            "updatedAt": "2023-06-06T13:48:19.087Z"
        },
        {
            "id": 4,
            "OwnerId": 1,
            "BookRecipientId": 2,
            "status": "Donated",
            "title": "The Hobbit",
            "author": "J. R. R. Tolkien",
            "isbn": "9780044403371",
            "condition": "Kertas menguning",
            "imgUrl": "https://m.media-amazon.com/images/I/41a7qVegqnL._SX437_BO1,204,203,200_.jpg",
            "createdAt": "2023-06-06T13:48:19.087Z",
            "updatedAt": "2023-06-06T14:22:07.506Z"
        },
        {
            "id": 3,
            "OwnerId": 1,
            "BookRecipientId": null,
            "status": "Requested",
            "title": "And Then There Were None",
            "author": "Agatha Christie",
            "isbn": "9781628992199",
            "condition": "Ada halaman hilang",
            "imgUrl": "https://m.media-amazon.com/images/I/51W7ynoiRsL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
            "createdAt": "2023-06-06T13:48:19.087Z",
            "updatedAt": "2023-06-06T14:22:44.273Z"
        },
        ...
    ]
}
```

&nbsp;

## 7. GET /myBook/:id

Description:
- Get user's book data with BookRecipient and requesting user by id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Succeeded getting book data",
    "data": {
        "id": 2,
        "OwnerId": 1,
        "BookRecipientId": null,
        "status": "Available",
        "title": "A Tale of Two Cities",
        "author": "Charles Dickens",
        "isbn": "9780582030473",
        "condition": "Baik",
        "imgUrl": "https://images-na.ssl-images-amazon.com/images/I/41WY82WVS0L.jpg",
        "createdAt": "2023-06-06T09:23:47.680Z",
        "updatedAt": "2023-06-06T09:23:47.680Z",
        "BookRecipients": [
            {
                "id": 1,
                "RecipientId": 2,
                "BookId": 2,
                "message": null,
                "createdAt": "2023-06-06T09:23:47.680Z",
                "updatedAt": "2023-06-06T09:23:47.680Z",
                "User": {
                    "id": 2,
                    "email": "staff1@gmail.com",
                    "name": "staff1",
                    "city": "Yoyakarta",
                    "phoneNumber": "3788209077",
                    "createdAt": "2023-06-06T08:59:08.475Z",
                    "updatedAt": "2023-06-06T08:59:08.475Z"
                }
            },
            {
                "id": 2,
                "RecipientId": 3,
                "BookId": 2,
                "message": null,
                "createdAt": "2023-06-06T09:23:47.680Z",
                "updatedAt": "2023-06-06T09:23:47.680Z",
                "User": {
                    "id": 3,
                    "email": "rprobart0@miibeian.gov.cn",
                    "name": "clane2",
                    "city": "Jakarta",
                    "phoneNumber": "5377985608",
                    "createdAt": "2023-06-06T08:59:08.617Z",
                    "updatedAt": "2023-06-06T08:59:08.617Z"
                }
            }
        ]
    }
}
```

Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## 8. POST /myBook/:id

Description:
- Create BookRecipient and change book's status to requested

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
    "message": "Succeeded request book"
}
```

Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## 9. PATCH /books/:bookRecipientId

Description:
- Update book status to 'Donated' and add RecipientId to book

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Succeeded donating book"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized"
}
```

_Response (401 - Unauthenticated)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```