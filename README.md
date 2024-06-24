## Ecommerce Store Web Application ##
### CS 4398 - Software Engineering Project ###
> Live Demo: https://mernabook.vercel.app/ 

The objective of this project is to develop an ecommerce web application using MERN stack (MongoDB, Express.js, React.js, Node.js). 

The application will consist of two different interfaces for different user roles: the client, who can browse and purchase items, and the store owner, who can manage the store seamlessly without any prior coding knowledge. With this project, we aim to provide a reliable and intuitive platform for hassle-free transactions for both clients and store owners. 

## Overview ##
The clients can access a user-friendly and visually-appealing website application to browse for college-level textbooks. The clients can filter products by category, brand, or price and view detailed listings before adding items to their cart. At the checkout, they can enter shipping and payment details, receiving confirmation via email upon successful purchase. 

The store owner can manage the business via an admin dashboard, allowing them to  update inventory and monitor orders. They can easily modify product listings, track inventory, and generate sales reports.

## Table of Contents ## 
* [Overview](#overview)
* [Features](#features)
* [Technologies](#technologies)
* [User Story](#user-story)
* [Installation and Setup](#installation-and-setup)
    * [Requirements](#requirements)
    * [How to Run](#how-to-run)
* [Project Status](#project-status)
* [Contact Team](#contact-team)

## Functional Expectation ##
**1. Client Side:**

* **Client Dashboard**: Client can access client dashboard to manage inventory, orders, and customer data.
* **User Authentication**: Clients can register and sign in to track the status of their order.
* **Browsing Inventory**: Clients can search, filter, and browse through items with detailed information such as brand, ID, price, etc.
* **Shopping Cart**: Clients can add items to their cart, view cart, and proceed to checkout.
* **Secure Payment**: Clients can secure transactions with payment gateway that upholds functionality and security standards.

**2. Store Owner Side:**

* **Admin Dashboard**: Store owners have access to a centralized dashboard to manage inventory, orders, and customer data.
* **Inventory Management**: Store owners can add new items, update existing ones, and remove items from the inventory.
* **Order Management**: Store owners can view and manage incoming orders, mark orders as fulfilled.
* **Sales Report**: Store owners can log weekly sales data and generate reports for sales data, including trends, totals, and summaries.

## Technologies ##
### Technology Stacks ###
* **Frontend**: React.js for building responsive user interface.
* **Backend**: Node.js and Express.js for creating a server-side application.
* **Database**: MongoDB’s Data Service for efficient data storage and retrieval with NoSQL data.
* **Authentication**: MongoDB’s App Service for authentication and authorization through custom JWT.
* **Payment Gateway Integration**: Paypal and Stripe sandboxes to create mock transactions.

### Technology Details ###
* React - version 18.2.0
* Node - version 20.7.0
* Express - version 4.18.2
* MongoDB - version 7.0
	* Realm Java SDK 
* Vercel - version 32.7.0
* Language
	* JavaScript
	* HTML, CSS
	* Python
* Version Control - Bitbucket, Trello

## Feature ##
* **User Interface**: Web application will feature a user-friendly and visually-appealing interface to facilitate easy browsing, selection, and purchase of items.
* **Admin Dashboard**: Store owner and/or admin can manage inventory, view and manage orders, and generate sales reports.
* **Client Dashboard**: Client can manage their account, track orders, and access exclusive features
* **Shopping Cart**: Users will be able to add items to their shopping cart, view the cart, and proceed to checkout for purchase.
* **Search and Filter**: Customers can browse products by category, brand, or price, enhancing the shopping experience. Admin can also browse products and orders by status, category, etc.
* **Registration**: Users can register accounts to track order statuses and access exclusive offers.
* **Payment**: Secure transactions will be enabled using a payment gateway integration for convenient and confident purchases.
* **Database**: MongoDB's Data Service will be utilized for efficient data storage and retrieval, supporting a large inventory and user base.


## Installation and Setup ##
### Requirements ###
* Node.js and npm [Donwload](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Java [Downoad](https://www.oracle.com/java/technologies/downloads/)
* Source-code editor of choice 
### How to Run ###
* Clone MernABook repo (branch: main) [BitBucket repo](https://bitbucket.org/rnb90/mernabook/src/main/c)
* Install all the necessary dependencies from the main package.json. Clean cache if needed.
```
npm cache clean --force
npm install
```
* Create the file `/backend/config.env` with your Atlas URI and the server port:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
```
* Start Backend server (on a seperate terminal):
```
cd backend
npm install --legacy-peer-deps
npm start
```
* Start Frontend server (on another seperate terminal):
```
cd frontend
npm install --legacy-peer-deps
npm start
```

## Project Status ##
The current status of this project is marked as **_in progress_**. 
> [Trello Board](https://trello.com/b/2eilQOtC/merncommerce) 


## Contact Team ##
* Michelle Nguyen ( [Email](rnb90@txstate.edu) & [LinkedIn](https://www.linkedin.com/in/michelle-nguyen-370711287/) )