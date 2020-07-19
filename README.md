# My-app - a website that accepts payments
A simple website that provides daily basketball news to fans. Customers can subscribe to the daily news updates with only $15/year. The website accepts card payments, making payments simple for customers.

## Introduction
This simple website was created using React for the front-end and Node for the back-end. To accept payments, the website integrates with Stripe and uses Stripe's PaymentIntent API. This document further details how to install, run, and test the website.

## Requirements
* Node and Node Package Manager (npm): You need to install Node.js and npm to run this project.
Visit https://www.npmjs.com/get-npm and click on the "Download Node.js and npm" button, which will trigger the download. Click on the downloaded package and begin the installation. This single installation will install both Node.js and npm.

* "Concurrently" package: The project uses npm's concurrently tool to run the client and server simultaneously in one terminal.

* Stripe and its libraries.

## Running the project
1. Ensure you have installed Node and npm. To confirm the installation, open a terminal and enter
```
node -v
npm -v
```
If you haven't installed Node and npm, then visit https://www.npmjs.com/get-npm to install.

2. Download the my-app folder and save it in a location you can easily access through the terminal.

3. In a terminal window, cd into my-app. For example if you saved my-app in Documents:
```
cd .../Documents/my-app
```

4. Install the required libraries.
```
npm install concurrently --save
npm install --save stripe
npm install --save @stripe/react-stripe-js @stripe/stripe-js

```

5. Run the project
` npm run start `

This will open a tab in your chrome browser to http://localhost:3000/ which will be the project's webpage.

6. To test the payment integration on the website, enter the following test cards per test case. For each test-case, enter an expiry date in the future, then enter any CVC and 5-digit postal code.

* Successful payment: 4242 4242 4242 4242
  This should be a successful charge and show a success message on the webpage. All successful charges are logged in .../my-app/log.txt.

* Payment requiring authentication: 4000 0025 0000 3155
  This will show a prompt asking you to authenticate, after which the payment will be successful and logged in .../my-app/log.txt.

* Payment declined: 4000 0000 0000 9995
  This will be a decide payment and the error message will be shown on the website.

Happy testing!

7. To see a list of the successful payments, go to .../my-app/log.txt

8. To test that web hooks work:
Follow the instructions on this page to install and set up the Stripe CLI: https://stripe.com/docs/payments/handling-payment-events#build-your-own-webhook

Then in one terminal, run the website using `nom run start` if it's not already running.
Then in another terminal, listen for web hook events by running `stripe listen --forward-to http://localhost:4242/webhook`
Then in a third terminal, trigger web hook events such as
```
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
stripe trigger payment_method.attached

```
