# Walmart Inhome

An demo project for a simple user/order management application.

Build from `create-react-app`

Used package:

1. React, React Router
2. express, axios, body-parser
3. node-sass, styled-components, antd
4. babel, nodemon, concurrently


Set up step:
  
1. In the root module, run command  `yarn install` to install dependency for back end service
2. In the client module, run command  `yarn install` to install dependency for front end application.
3. Back to root module run command `npm run dev` to start both back end server and front end website

### Project Tree Structure

```
├── README.md
├── client
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── assets
│   │   │   └── img
│   │   │       ├── ava.png
│   │   │       └── logo.svg
│   │   ├── container
│   │   │   ├── app
│   │   │   │   ├── App.css
│   │   │   │   ├── App.js --- Component to set up React Router config route.
│   │   │   │   └── App.test.js
│   │   │   ├── components
│   │   │   │   └── nav
│   │   │   │       ├── Nav.js --- Navigation bar Component
│   │   │   │       └── Nav.styled.js
│   │   │   └── pages
│   │   │       ├── Home.css
│   │   │       ├── Home.js --- Component for landing page
│   │   │       ├── Item
│   │   │       │   ├── Item.js --- Component for display and management items
│   │   │       │   ├── Item.scss
│   │   │       │   └── self
│   │   │       │       └── AddModal.js --- Component for add item modal
│   │   │       ├── Order
│   │   │       │   ├── Order.js --- Component for display and management orders
│   │   │       │   ├── Order.scss
│   │   │       │   └── self
│   │   │       │       ├── AddOrder.js --- Componentn for add order modal
│   │   │       │       └── ModifyOrder.js --- Componentn for modify order modal
│   │   │       └── User
│   │   │           ├── User.js --- Component for display and management orders
│   │   │           ├── User.scss
│   │   │           └── self
│   │   │               ├── AddUserModal.js --- Component for add new user
│   │   │               ├── UserCard.js --- Component for display user card block in User Component
│   │   │               └── UserCard.styled.js
│   │   ├── global.js
│   │   ├── index.css
│   │   ├── index.js --- Root Componenent
│   │   ├── serviceWorker.js
│   │   ├── setupTests.js
│   │   └── theme.js --- theme file
│   └── yarn.lock
├── dist
│   ├── api
│   │   ├── index.js
│   │   └── userRoutes.js
│   ├── db
│   │   ├── database.js
│   │   ├── seed.js
│   │   └── walmart_inhome.db
│   └── server.js
├── package-lock.json
├── package.json
└── server
    ├── src
    │   ├── api
    │   │   ├── index.js --- index for api routes 
    │   │   ├── itemRoutes.js --- route for items api
    │   │   ├── orderRoutes.js --- route for orders api
    │   │   └── userRoutes.js --- route for users api
    │   ├── db
    │   │   ├── database.js --- database util for connect to database
    │   │   └── walmart_inhome.db
    │   ├── server.js --- express web server
    │   └── utils
    │       └── utils.js --- util functions
    └── test
        └── server.js
```

### RESTful Api

#### Item Route

`GET  /item/list`    fetch all items

`GET  /item/:itemId` fetch specific item with itemId

`POST /item`         Add new item

#### Order Route

`GET  /order/list`   fetch all orders come username and item name

`GET  /order/:orderId` fetch specific order by orderId

`PATCH /order/:orderId` update order by orderId

`POST /order` add new order


#### User Route

`GET /user/list` fetch all users

`GET /user/:userId` fetch specific user by userId

`GET /user/orders/:userId` fetch user's orders by userId

`POST /user` add new user
