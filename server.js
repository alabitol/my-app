const express = require("express");
const app = express();
const { resolve } = require("path");

const stripe = require("stripe")("sk_test_51H5tfUEz8jTvgCOpd7DQBxk3BShbuQnn3amFTXr4SaQQ4bzDn0Tws8b0KEkwJXjM01nNrmnD1hIcoZFqf6VaDxZ900MnqpAEbd");

const bodyParser = require("body-parser");

var fs = require("fs");

app.use(express.static("."));
app.use(express.json());

// $15
const amount = 1500;

const calculateOrderAmount = items => {
  // $15
  return amount;
};

app.post("/create-payment-intent", async (req, res) => {

  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
	//console.log("created payment intent");

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

// Expose an endpoint as a webhook handler for asynchronous events.
// Match the raw body to content type application/json
app.post("/webhook", async (request, response) => {
  let data, eventType, price;

  data = request.body.data;
  eventType = request.body.type;
  price = data.object.amount;

  switch (eventType) {
    case 'payment_intent.succeeded':
      console.log("PaymentIntent was successful!");
      fs.appendFileSync("log.txt", "[" + new Date() + "] Successful payment of $" + price/100 +"\n");
      console.log("Payment logged to file - .../my-app/log.txt");
      break;
    case 'payment_method.attached':
      console.log("PaymentMethod was attached to a Customer!");
      break;
    case 'payment_intent.payment_failed':
      console.log("Payment failed!");
      break;
    default:
      // Unexpected event type
      console.log("Event type: " + eventType);
      return response.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});

});


app.listen(4242, () => console.log('Node server listening on port 4242!'));

