const Stripe = require('stripe')
require("dotenv").config({path: "variables.env" });

export default const stripe = new Stripe(process.env.STRIPE_SECRET);
