# Admin Employee Platform

This project is a web application for managing employee data. It allows for CRUD operations (Create, Read, Update, Delete) on employee records. The application is built with React for the frontend and Node.js/Express for the backend.

## Features

- Employee creation with image upload
- Search employees by name
- Sort employees by name, email, or creation date
- View detailed employee information
- Update employee information
- Delete employee records with confirmation dialog

## Tech Stack

- Frontend: React, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
  

## Installation
for backend
```bash
cd server
npm install
```
for frontend

```bash
cd ../client
npm install
```


##Running the Application
Backend

```
cd server
```
Create a key.js file and add your MongoDB connection string
```
MONGODB_URI="your_mongodb_connection_string"
```
```
npm start
```
The backend server will start on http://localhost:5000.

Frontend
```
cd client
npm start
```
The frontend server will start on http://localhost:3000.






