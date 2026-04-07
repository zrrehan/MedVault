import config from "../../config"

const stripe = require("stripe")(config.stripe_key);
async function payment(lineItems: any) {
    console.log(lineItems);
    return await stripe.checkout.sessions.create({
        payment_method_types: ["card"], 
        line_items: lineItems, 
        mode: "payment", 
        success_url:"http://localhost:3000/my-orders/success", 
        cancel_url:"http://localhost:3000/my-orders/failed", 
    })
}

export const stripeService = {
    payment
}