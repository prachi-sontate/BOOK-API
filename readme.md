#  Book Review API

A RESTful API built with Node.js and Express.js that allows users to sign up, log in, add books, write reviews, and search for books. JWT-based authentication is used to secure user actions.

---

## Features

- JWT Authentication (Signup & Login)
- Add, retrieve, and filter books
- Submit, update, and delete reviews
- Pagination support for books and reviews
- Case-insensitive book search by title or author
- Clean and modular project structure

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- dotenv for environment variables

---

##  Project Structure
book-review-api/
├── controllers/
├── middleware/
├── models/
├── node_modules/
├── routes/
├── .env
├── config.js
└── package-lock.json
├── package.json
└── readme.md
└── server.js


##  Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/book-review-api.git
   cd book-api
2. **Install dependencies**
    npm install
3. **Create a .env file**
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/bookreviewdb
    JWT_SECRET=your_jwt_secret
4. **Start the server**
    npm start
===========================================================

**Example API Requests**
**Authentication**
1. **Signup**
curl -X POST http://localhost:5000/signup \
-H "Content-Type: application/json" \
-d '{"username":"prachi-sontate","password":"Prachi@3182"}'


2. **Login**

curl -X POST http://localhost:5000/login \
-H "Content-Type: application/json" \
-d '{"email":"john@example.com","password":"123456"}'

============================================================

**Books**
1. **Add Book**

curl -X POST http://localhost:5000/books \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"title":"1984","author":"George Orwell","genre":"Dystopian"}'

2. **Get Books (with pagination & filters)**
curl "http://localhost:5000/books?page=1&limit=10&author=Orwell&genre=Dystopian"

3. **Get Book by ID**
curl http://localhost:5000/books/<book_id>

=====================================================================================

**Reviews**
1. **Add Review**
curl -X POST http://localhost:5000/books/<book_id>/reviews \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"rating":5,"comment":"Excellent read!"}'

2. **Update Review**
curl -X PUT http://localhost:5000/reviews/<review_id> \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"rating":4,"comment":"Updated comment"}'

3. **Delete Review**
curl -X DELETE http://localhost:5000/reviews/<review_id> \
-H "Authorization: Bearer <token>"

==========================================================================

**Search**
1. **Search Books**
curl "http://localhost:5000/search?query=orwell"

==========================================================================

**Database Schema (MongoDB)**
1. **Users**
{
  _id,
  username,
  email,
  password (hashed)
}

2. **Books**
{
  _id,
  title,
  author,
  genre,
}

3. **Reviews**
{
  _id,
  bookId,
  userId,
  rating,
  comment,
}

=============================================================

**Design Decisions & Assumptions**
One review per user per book is enforced.
Reviews can be updated or deleted only by their authors.
Pagination defaults to 10 items per page if not specified.
JWT token expires in 24 hours (configurable).
Case-insensitive search using regex on title and author fields.