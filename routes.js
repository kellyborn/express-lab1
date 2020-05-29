const express = require("express");

const cart = express.Router();

const endpointURI = "/cart-items";

//mock data
let cartItems = [
    {
        id: 1,
        product: "shirt",
        price: "$23.00",
        quantity: 3
    },
    {
        id: 2,
        product: "pants",
        price: "$36.00",
        quantity: 2
    },
    {
        id: 3,
        product: "shoes",
        price: "$43.00",
        quantity: 1
    },
    {
        id: 4,
        product: "socks",
        price: "$8.00",
        quantity: 3
    }
]

let nextId = cartItems.length + 1;

// Create Endpoints

// 1. GET / cart-items

cart.get(endpointURI, (request, response) => {
    response.json(cartItems);
    response.send(200);
})

// 2. GET / cart-items/ :id
cart.get(`${endpointURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let cartItem = cartItems.find((item) => {
        if (item.id === id) {
            return true
        }
    })
    if (cartItem) {
        response.send(200);
    } else {
        response.send("ID Not Found");
        response.send(404);
    }
})

// 3. POST / cart-items
cart.post(endpointURI, (request, response) => {
    let newCartItem = request.body;
    newCartItem.id = nextId;
    cartItems.push(newCartItem);
    nextId++;
    response.send(201);
    response.json(newCartItem);
})

// 4 PUT /cart-items/:id
cart.put(`${endpointURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let updatedCartItem = request.body;
    updatedCartItem.id = id;
    let foundIndex = cartItems.findIndex((item) => {
        if (item.id === id) {
            return true
        }
    })
    cartItems.splice(foundIndex, 1, updatedCartItem);
    response.status(200);
    response.json(updatedCartItem);
})

// 5. DELETE / cart-items/:id

cart.delete(`${endpointURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let foundIndex = cartItems.findIndex((item) => item.id === id);
    if (foundIndex > -1) {
        cartItems.splice(foundIndex, 1);
        response.status(204);
    }
})


module.exports = { cart };

