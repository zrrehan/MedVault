import config from "../../config"

const stripe = require("stripe")(config.stripe_key);
async function payment(lineItems: any, orderId: string) {
    console.log(orderId);
    return await stripe.checkout.sessions.create({
        payment_method_types: ["card"], 
        line_items: lineItems, 
        mode: "payment", 
        success_url:`http://localhost:3000/my-orders/success?orderId=${orderId}`, 
        cancel_url:`http://localhost:3000/my-orders/failed?orderId=${orderId}`, 
        metadata: {
            orderId: orderId
        }
    })
}

export const stripeService = {
    payment
}