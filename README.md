# Public Declarations Project

This project is a **full-stack web application** that allows users to create, edit, and delete public declarations. It was built using modern web development tools and deployed to production using **Vercel** and **Render**.

## Technologies Used

### Frontend

-   **Node.js** with **Express.js** for server-side rendering
-   **EJS** (Embedded JavaScript) as the templating engine
-   **CSS** for styling, with responsive design implemented using media queries
-   **Axios** for making HTTP requests to the backend API

### Backend

-   **Node.js** with **Express.js** for building the RESTful API
-   **MongoDB** as the database, hosted on **MongoDB Atlas**
-   **Mongoose** for object data modeling (ODM)
-   **dotenv** for managing environment variables
-   **Body-parser** for parsing incoming request bodies
-   **Axios** for making HTTP requests between services

## Deployment

### Frontend

-   Deployed on **Vercel**
-   Responsible for rendering the user interface and interacting with the backend API
-   **Live Project**: [https://blog-api-xi-sepia.vercel.app/](https://blog-api-xi-sepia.vercel.app/)

### Backend

-   Deployed on **Render**
-   Provides a RESTful API for managing declarations, including routes for creating, reading, updating, and deleting posts

## Features

-   Users can **create** new public declarations
-   Users can **edit** existing declarations
-   Users can **delete** declarations
-   **Responsive design** for mobile and desktop devices
-   **Error handling** for failed API requests
-   Secure connection to **MongoDB Atlas** using environment variables

## Project Structure

-   **public**: Contains static files such as CSS
-   **views**: Contains EJS templates for rendering the frontend
-   **server.js**: The main entry point for the frontend server
-   **index.js**: The main entry point for the backend API
-   **.env**: Contains environment variables such as MongoDB connection string
-   **vercel.json**: Configuration file for deploying the frontend on Vercel

## How to Run Locally

1. **Clone the repository**
2. **Install dependencies** using `npm install`
3. Create a `.env` file with the following variables:
    - `MONGO_URI`: Your MongoDB connection string
    - `PORT`: The port for the backend server (default is 4000)
4. Start the backend server using `node index.js`
5. Start the frontend server using `node server.js`
6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Tools and Services Used

-   **Vercel**: For deploying the frontend
-   **Render**: For deploying the backend
-   **MongoDB Atlas**: For hosting the database
-   **Postman**: For testing API endpoints during development
-   **Git and GitHub**: For version control and collaboration

## Why This Project

This project demonstrates my ability to build and deploy a **full-stack web application**. It showcases my skills in:

-   **Backend development** with Node.js and Express.js
-   **Frontend rendering** with EJS and CSS
-   **Database management** with MongoDB and Mongoose
-   **Deployment and configuration** using Vercel and Render
-   Writing **clean and maintainable code**
-   **Debugging and testing APIs**

This project is a great example of my ability to take a concept from development to production while ensuring **scalability**, **security**, and **usability**.

You can view the **live project** at: [https://blog-api-xi-sepia.vercel.app/](https://blog-api-xi-sepia.vercel.app/)
