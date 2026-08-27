# Areesha & Co. --- E-Commerce Web Application

A full-stack e-commerce web application developed as part of the CUS
Internship project. The application provides a complete online shopping
experience with a React frontend, Node.js/Express backend, MongoDB
database, Cloudinary image management, Stripe payment integration, and
AWS Elastic Beanstalk deployment.

## Live Deployment

**AWS Elastic Beanstalk Environment:** `areesha-co-env`

**Region:** `ap-south-1` (Asia Pacific --- Mumbai)

**Platform:** Node.js 24 running on 64-bit Amazon Linux 2023

> The live URL is provided by AWS Elastic Beanstalk through the
> environment CNAME.

------------------------------------------------------------------------

## Features

### Customer Features

-   Browse all products
-   Browse products by category
-   Shop products by occasion
-   View individual product details
-   Search products
-   Add products to cart
-   Update cart quantities
-   Remove products from cart
-   User registration and login
-   User authentication using JWT
-   Place orders
-   Stripe payment integration
-   View order information
-   Responsive and user-friendly interface

### Admin Features

-   Admin authentication
-   Add new products
-   Upload product images
-   View product inventory
-   Manage products
-   Update product information
-   Delete products
-   View and manage orders

### UI Features

-   Modern jewelry-focused design
-   Custom decorative doodles/background elements
-   Responsive navigation
-   Product cards and category sections
-   Shopping cart interface
-   User account interface
-   Responsive layout for different screen sizes

------------------------------------------------------------------------

## Technology Stack

### Frontend

-   React.js
-   Vite
-   JavaScript
-   HTML5
-   CSS3
-   Axios

### Backend

-   Node.js
-   Express.js
-   ES Modules
-   JWT Authentication
-   bcrypt
-   Express Validator
-   Multer

### Database

-   MongoDB
-   Mongoose

### Cloud Services

-   AWS Elastic Beanstalk --- application deployment
-   Cloudinary --- product image storage and management
-   Stripe --- payment processing

### Development Tools

-   Git
-   GitHub
-   npm
-   Nodemon
-   AWS Elastic Beanstalk CLI

------------------------------------------------------------------------

## Project Structure

The project is organized into separate frontend and backend
applications.

``` text
ecommerce-final/
│
├── ecommerce-final-frontend/
│   ├── src/
│   ├── public/
│   ├── dist/
│   ├── package.json
│   └── ...
│
└── ecommerce-final-backend/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── public/
    │   └── frontend build files
    ├── server.js
    ├── package.json
    └── ...
```

The backend's `public` directory contains the built frontend files for
production deployment.

------------------------------------------------------------------------

# Local Development Setup

## Prerequisites

Install the following before running the project:

-   Node.js
-   npm
-   MongoDB database / MongoDB Atlas account
-   Cloudinary account
-   Stripe account (if testing payments)

Check Node and npm versions:

``` bash
node --version
npm --version
```

------------------------------------------------------------------------

## 1. Clone the Repository

``` bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd ecommerce-final
```

------------------------------------------------------------------------

## 2. Install Frontend Dependencies

``` bash
cd ecommerce-final-frontend
npm install
```

------------------------------------------------------------------------

## 3. Install Backend Dependencies

``` bash
cd ../ecommerce-final-backend
npm install
```

------------------------------------------------------------------------

# Environment Variables

Create a `.env` file inside the backend directory.

Example:

``` env
PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

Use your actual credentials in the local `.env` file.

**Never commit `.env` or secret keys to GitHub.**

------------------------------------------------------------------------

# Running the Backend Locally

From the backend directory:

``` bash
npm start
```

The backend runs on:

``` text
http://localhost:4000
```

For development with Nodemon:

``` bash
npm run server
```

------------------------------------------------------------------------

# Running the Frontend Locally

From the frontend directory:

``` bash
npm run dev
```

Vite will provide the local development URL in the terminal, normally:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# Production Build

The production frontend is built using Vite.

From the frontend directory:

``` bash
npm run build
```

This generates:

``` text
dist/
```

The generated frontend build must then be copied into the backend's
`public` directory before deploying to AWS Elastic Beanstalk.

### Windows PowerShell

From the frontend directory:

``` powershell
Copy-Item -Path .\dist\* -Destination ..\ecommerce-final-backend\public -Recurse -Force
```

------------------------------------------------------------------------

# Production Architecture

The deployed application uses a single deployable application.

``` text
                    User
                      │
                      ▼
              AWS Elastic Beanstalk
                      │
                      ▼
              Node.js / Express
                 ┌────┴────┐
                 │         │
                 ▼         ▼
          React Frontend   REST API
          (static files)      │
                              ▼
                           MongoDB

        ┌─────────────────────┐
        │                     │
        ▼                     ▼
    Cloudinary              Stripe
   Product Images          Payments
```

The React application is compiled into static files and served by
Express. This allows the frontend and backend to operate under the same
production origin.

------------------------------------------------------------------------

# AWS Elastic Beanstalk Deployment

The backend directory is the deployment root because it contains both
the Express application and the production frontend build.

## Initialize Elastic Beanstalk

From the backend directory:

``` bash
eb init
```

Select:

-   AWS Region: `ap-south-1`
-   Platform: Node.js
-   Platform branch: Node.js 24 running on 64-bit Amazon Linux 2023
-   SSH: optional

## Create the Environment

The environment used for this project is:

``` bash
eb create areesha-co-env
```

## Check Environment Status

``` bash
eb status areesha-co-env
```

Expected status:

``` text
Status: Ready
Health: Green
```

## Deploy Updates

After making changes:

``` bash
eb deploy areesha-co-env
```

Do not create a new environment for every update.

------------------------------------------------------------------------

# Updating the Frontend

Whenever the React frontend is changed:

### 1. Build the frontend

``` bash
cd ecommerce-final-frontend
npm run build
```

### 2. Copy the new build

``` powershell
Copy-Item -Path .\dist\* -Destination ..\ecommerce-final-backend\public -Recurse -Force
```

### 3. Deploy

``` powershell
cd ..\ecommerce-final-backend
eb deploy areesha-co-env
```

### 4. Check deployment

``` powershell
eb status areesha-co-env
```

The environment should return:

``` text
Status: Ready
Health: Green
```

------------------------------------------------------------------------

# Updating the Backend

For backend-only changes, rebuild/copying the frontend is not necessary.

From the backend directory:

``` bash
eb deploy areesha-co-env
```

------------------------------------------------------------------------

# API Structure

The backend exposes API routes under `/api`.

``` text
/api/user
/api/product
/api/order
```

These routes handle user-related operations, product management, and
order processing.

------------------------------------------------------------------------

# Security

The application uses several security mechanisms:

-   JWT-based authentication
-   Password hashing with bcrypt
-   Environment variables for sensitive credentials
-   Express request validation
-   CORS configuration
-   Protected admin functionality

Sensitive information such as database credentials, JWT secrets,
Cloudinary credentials, and Stripe keys should never be committed to
source control.

------------------------------------------------------------------------

# Useful Commands

### Backend

``` bash
npm install
npm start
npm run server
```

### Frontend

``` bash
npm install
npm run dev
npm run build
```

### AWS Elastic Beanstalk

``` bash
eb status areesha-co-env
eb health areesha-co-env
eb events areesha-co-env
eb deploy areesha-co-env
```

------------------------------------------------------------------------

# Deployment Workflow

``` text
Make code changes
       │
       ▼
Test locally
       │
       ▼
Frontend change?
   │           │
  Yes          No
   │           │
   ▼           │
npm run build  │
   │           │
   ▼           │
Copy dist → public
   │           │
   └─────┬─────┘
         ▼
   eb deploy
         │
         ▼
Check EB Health
         │
         ▼
   Health: Green
```

------------------------------------------------------------------------

# Project Status

The application has been deployed to AWS Elastic Beanstalk using:

-   Node.js 24
-   Amazon Linux 2023
-   AWS Elastic Beanstalk
-   MongoDB
-   Cloudinary
-   Stripe

The Elastic Beanstalk environment is configured as a web server
environment and is currently expected to report **Ready / Green** after
a successful deployment.

------------------------------------------------------------------------

# Author

**Areesha Hameed Khan**

CUS Internship --- E-Commerce Application
