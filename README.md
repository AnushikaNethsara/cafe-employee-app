This is a web application for managing cafe employee data. It consists of a frontend application built with React and a backend server built with Node.js and Express.

Installation and Usage
To use this application, follow the steps below:

Clone the Git repository by running the following command in your terminal:
    git clone https://github.com/AnushikaNethsara/cafe-employee-app


Run Frontend Application:

    1. Navigate to the web-app directory in your terminal:

    2. Run the following command in your terminal:
        docker build -t cafe-employee-frontend:dev:latest .

    3. After completing above run the following command in your terminal:
        docker run -it -p 3000:3000 cafe-employee-frontend:dev:latest

Run Backend Application:
    1. Copy the .env file in zip file to server directory

    2. Navigate to the server directory in your terminal:

    3. Run the following command in your terminal:
        docker build -t cafe-employee-server:latest .

    4. After completing above run the following command in your terminal:
        docker run -it -p 5000:5000 cafe-employee-server:latest


