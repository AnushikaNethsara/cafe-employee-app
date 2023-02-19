This is a web application for managing cafe employee data. It consists of a frontend application built with React and a backend server built with Node.js and Express.

Installation and Usage
To use this application, follow the steps below:

Clone the Git repository by running the following command in your terminal:
    git clone https://github.com/AnushikaNethsara/cafe-employee-app

You can run the application with or without Docker. Follow either Method 1 or Method 2

Method 1: RUN WITHOUT DOCKER

    Run Frontend Application:

        1. Navigate to the web-app directory in your terminal:

        2. Run the following command in your terminal:
            npm i

        3. After completing above run the following command in your terminal:
            npm start

    Run Backend Application:

        1. Copy the .env file in zip file to server directory

        2. Navigate to the server directory in your terminal:

        3. Run the following command in your terminal:
            npm i

        4. After completing above run the following command in your terminal:
            npm start



Method 2: RUN USING DOCKER

    Run Frontend Application:

        1. Navigate to the web-app directory in your terminal:

        2. Run the following command in your terminal:
            docker build -t cafe-employee-frontend:latest .

        3. After completing above run the following command in your terminal:
            docker run -it -p 3000:3000 cafe-employee-frontend:latest

        4. After completing above open following URL in web browser
            http://localhost:3000/

    Run Backend Application:

        1. Copy the .env file in zip file to server directory

        2. Navigate to the server directory in your terminal:

        3. Run the following command in your terminal:
            docker build -t cafe-employee-server:latest .

        4. After completing above run the following command in your terminal:
            docker run -it -p 5000:5000 cafe-employee-server:latest


