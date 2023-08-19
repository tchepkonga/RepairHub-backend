# RepairHub-backend
This is the backend for the RepairHub application, built using Node.js, Express, and MongoDB.
# Overview
The RepairHub backend manages the order processing for a device repair service. Customers can create orders detailing their device and the type of damage, and they can later search for their orders using various criteria.
# Installation and Setup
Prerequisites
Node.js
MongoDB
# Installation
Clone this repository:
git clone https://github.com/tchepkonga/RepairHub-backend.git
Navigate to the project directory:
cd RepairHub-backend
Install the dependencies:
npm install
Create a .env file in the root directory and configure the following environment variables:
MONGO_URI: Your MongoDB connection string.
PORT: (Optional) Port number for the server. Defaults to 5000 if not specified.
Run the server:
nodemon
RepairHub Backend
This is the backend for the RepairHub application, built using Node.js, Express, and MongoDB.

Overview
The RepairHub backend manages the order processing for a device repair service. Employees can create orders detailing their device and the type of damage, and they can later search for their orders using various criteria.

Installation and Setup
Prerequisites
Node.js
MongoDB
Installation
Clone this repository:

bash
git clone https://github.com/tchepkonga/RepairHub-backend.git
Navigate to the project directory:

bash
cd RepairHub-backend
Install the dependencies:

bash
npm install
Create a .env file in the root directory and configure the following environment variables:

MONGO_URI: Your MongoDB connection string.
PORT: (Optional) Port number for the server. Defaults to 5000 if not specified.
Run the server:

bash
nodemon
The server will start, and you should see a message indicating the port it's running on.
# API Endpoints
1. Add Order:
  .Method: POST
   .Endpoint: /api/orders
   .Description: Allows a user to add a new order with a file attached.
2. Get Paginated Orders:
   .Method: GET
    .Endpoint: /api/orders
    .Description: Retrieves a paginated list of orders.
3. Search and Filter Orders:
    .Method: GET
     .Endpoint: /api/orders/search
      .Description: Allows for the searching and filtering of orders based on customer name and device type.

   # Technologies Used
   Server: Express.js
   Database: MongoDB (using Mongoose as the ODM)
   File Upload: Multer
   
   # Future Enhancements
     Add user authentication and authorization.
     Enhance error handling and validation.
    Implement more advanced searching and filtering capabilities.
