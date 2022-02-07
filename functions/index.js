const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",
    (req, res) => {res.status(200).send("Hello World!")});

app.post("/payments/create",
    async(request,response) => {
    const total = request.query.total;
    console.log("Payment received",total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    })

    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})


exports.api= functions.https.onRequest(app);



