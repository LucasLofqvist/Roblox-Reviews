# Roblox-Reviews

## Overview
Fullstack Project - Web application to help parents get a better understanding of the Roblox games that their children might be playing.

## Technical Solutions
- **Frontend**: React.js is used to build the user interface for the client-side of the application.
- **Backend**: Node.js with Express.js is used to create the server-side logic and APIs.
- **Database**: MongoDB is used as the database, and Mongoose is used as the MongoDB object modeling tool.

## Deployment
This application can be deployed using [Render](https://render.com/)

## How to Run the App
To run the application locally, follow these steps:

1. **Install Dependencies**
   - Navigate to the `client` directory and install dependencies:
     ```
     cd client
     npm install
     ```
   - Navigate to the `server` directory and install dependencies:
     ```
     cd server
     npm install
     ```

2. **Build the Client**
   - If it's the initial start of the application or if updates have been made to the client-side, you need to build the client:
     ```
     cd client
     npm run build
     ```

3. **Run the Server**
   - Navigate to the `server` directory:
     ```
     cd server
     ```
   - Run the server:
     ```
     npm run server
     ```

4. **Access the Application**
   - Once the server is running, the application will be available at: [http://localhost:3000](http://localhost:3000)

## License
[MIT License](LICENSE)
