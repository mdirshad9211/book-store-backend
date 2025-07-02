
# Bookstore API

Made By Md Irshad 
#### NOTE: I have added the Postman Test Collection file also which can be used to test the apis directly after running the backend without manually adding all requests


## Setup Instructions

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (Version 14 or higher)
* npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mdirshad9211/book-store-backend
   ```

2. Navigate to the project folder:

   ```bash
   cd bookstore-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
#### NOTE: I have removed my original .evv file due to security purpose and I add added .env it .gitignore and for your reference I have mentioned in the .env.example file Please look into it 

   ```plaintext
   JWT_SECRET=your_secret_key
   ```

   Replace `your_secret_key` with a secret string that will be used to sign JWT tokens.

### Running the Server

Start the server using:

```bash
npm start
```

Or in development mode (with auto-reloading using `nodemon`):

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

## API Endpoints

### Authentication

#### 1. Register a User

* **Endpoint**: `POST /api/auth/register`
* **Description**: Register a new user with email and password.
* **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

* **Response**:

```json
{
  "message": "User registered successfully"
}
```

#### 2. Login to Get JWT Token

* **Endpoint**: `POST /api/auth/login`
* **Description**: Login to receive a JWT token.
* **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

* **Response**:

```json
{
  "token": "your_jwt_token_here"
}
```

### Books

#### 1. Get All Books

* **Endpoint**: `GET /api/books`
* **Description**: Get a list of all books (requires authentication).
* **Headers**: `Authorization: Bearer your_jwt_token_here`
* **Response**:

```json
[
  {
    "id": "uuid",
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Genre",
    "publishedYear": 2021,
    "userId": "user_id"
  }
]
```

#### 2. Get Book by ID

* **Endpoint**: `GET /api/books/:id`
* **Description**: Get a book by its ID (requires authentication).
* **Parameters**: `id` (UUID of the book)
* **Headers**: `Authorization: Bearer your_jwt_token_here`
* **Response**:

```json
{
  "id": "uuid",
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre",
  "publishedYear": 2021,
  "userId": "user_id"
}
```

#### 3. Add a New Book

* **Endpoint**: `POST /api/books`
* **Description**: Add a new book (requires authentication).
* **Headers**: `Authorization: Bearer your_jwt_token_here`
* **Request Body**:

```json
{
  "title": "New Book Title",
  "author": "New Author",
  "genre": "Fiction",
  "publishedYear": 2023
}
```

* **Response**:

```json
{
  "id": "uuid",
  "title": "New Book Title",
  "author": "New Author",
  "genre": "Fiction",
  "publishedYear": 2023,
  "userId": "user_id"
}
```

#### 4. Update a Book

* **Endpoint**: `PUT /api/books/:id`
* **Description**: Update a book by its ID (requires authentication).
* **Parameters**: `id` (UUID of the book)
* **Headers**: `Authorization: Bearer your_jwt_token_here`
* **Request Body**:

```json
{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "genre": "Updated Genre",
  "publishedYear": 2024
}
```

* **Response**:

```json
{
  "id": "uuid",
  "title": "Updated Book Title",
  "author": "Updated Author",
  "genre": "Updated Genre",
  "publishedYear": 2024,
  "userId": "user_id"
}
```

#### 5. Delete a Book

* **Endpoint**: `DELETE /api/books/:id`
* **Description**: Delete a book by its ID (requires authentication).
* **Parameters**: `id` (UUID of the book)
* **Headers**: `Authorization: Bearer your_jwt_token_here`
* **Response**:

```json
{
  "message": "Book deleted successfully"
}
```





## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


