# 🛍️ ShopEase - E-commerce Web App

<img src="./docs/assets/logo-rectangle.png" alt="logo" width="100px" >

## Deployment

### [Deployed at Render 🔗](https://shop-ease-a7ya.onrender.com/)

### FYI

- The Project is deployed on Render on free tier. It may take up to 50 seconds or few more to up the server depending upon your internet speed initially. It is not a performance issue.

![Image](https://github.com/irahuldutta02/user-management/assets/78687135/6f9fd8eb-0303-441c-916f-0ff7b346787f)

<!-- ## Video Preview -->

## Description

### 🛍️ ShopEase is a E-commerce Web App built using React, Redux, Node.js, Express.js, MongoDB, and DaisyUI. It is a full-stack project with a complete authentication system google signin, product management, cart, and checkout functionality admin services.

- 👥 User can do all the actions as like we can do in any e-commerce website.
- 🛒 User can add products to cart, remove products from cart, increase or decrease the quantity of products in cart, and can checkout the products.
- 📜 User can later see the order history and each order status.
- 💳 Stripe payment gateway is integrated for the payment.
- 🔒 Fully functional authentication system is and also there is option to continue with google signin.
- 🔍 A fully functional product search functionality is also there.
- 📝 In the product page product review system is also there.
- 👮‍♂️ Admin can manage products, orders, and users.
- 📦 Admin can add products, update products, delete products, and can see the orders placed by the users.
- 👥 Admin can also add and remove other admins.
- 📱 The design of the website is responsive and mobile-friendly.



## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/irahuldutta02/shop-ease.git
```

```bash
cd shop-ease
```

### 2. Setup the environment variables

- Create a `.env` file in the root of the project
- Add the following environment variables shown in the [`sample.env.txt`](./sample.env.txt) file

### 3. Local Dev environment Setup for client

- Make sure you comment out the `// for production` commented line and uncomment `// for development` commented line [`server.config.js`](./client/config/server.config.js) file inside the `./client/config` folder 
- ** Make sure you do not push the changes of the server.config.js file for production. It is only for local development.

### 4. Install dependencies

```bash
npm run build
```

### 5. Start the development server

```bash
npm run dev
```

## Technologies Used

- **Frontend**:

  - [React](https://reactjs.org/)
  - [Redux](https://redux.js.org/)
  - [DaisyUI](https://daisyui.com/)

- **Backend**:

  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)

- **Packages**:

  - [Axios](https://axios-http.com/)
  - [React Router](https://reactrouter.com/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [React Icons](https://react-icons.github.io/react-icons/)
  - [React Hot Toast](https://react-hot-toast.com/)

- **Database**:

  - [MongoDB](https://www.mongodb.com/)

- **Authentication**:

  - [JWT](https://jwt.io/)
  - Google Sign-In

- **Payment Gateway**:

  - [Stripe](https://stripe.com/)

- **Deployment**:
  - [Render](https://render.com/)
