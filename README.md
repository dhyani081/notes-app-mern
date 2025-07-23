# Notes App (MERN Stack)

This is a full-stack Notes application built using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. The app allows users to register, log in, and manage their personal notes with full CRUD (Create, Read, Update, Delete) functionality. It also includes user authentication using JSON Web Tokens (JWT) and protects routes that require the user to be logged in.

The project is divided into two main folders: `notes-simple-crud-backend` for the backend and `notes-crud-frontend` for the frontend. The backend uses Express.js to set up a RESTful API, connects to MongoDB using Mongoose, and handles authentication, routing, and error management. The frontend is built with React and Vite, and it interacts with the backend API to perform all note-related operations. It also manages user sessions using JWTs stored in the browser.

To run this project locally, first navigate to the `notes-simple-crud-backend` directory, install the dependencies using `npm install`, and create a `.env` file with the required environment variables: `PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, and `FRONTEND_URL`. After setting up the environment variables, you can start the backend server using `npm start`. It will run on `http://localhost:6000`.

Next, navigate to the `notes-crud-frontend` directory, install the dependencies using `npm install`, and then start the frontend server using `npm run dev`. This will run the frontend application on `http://localhost:5173`.

The application securely stores passwords using bcryptjs, uses JWT for user session management, and protects sensitive routes from unauthorized access. The project is structured for clarity and maintainability, with separate folders for routes, models, middleware, and components.
