import { Request, Response } from "express";
import { stripeService } from "./stripe.service"
import config from "../../config";

async function payment(req: Request, res: Response) {
    try {
        const {products} = req.body;
        const {orderId} = req.query;
        const lineItems = products.map((product:any) => {
            return {
                price_data: {
                    currency:"bdt", 
                    product_data: {
                        name: product.name, 
                        images: [product.image]
                    }, 
                    unit_amount: product.price*100
                }, 
                quantity: Math.round(product.quantity)
            }
        })
        const result = await stripeService.payment(lineItems as any, orderId as string);
        res.send({id: result.id, url: result.url}) 
    } catch(error: any) {
        res.send(error);
    }
}

const stripe = require("stripe")(config.stripe_key);
async function verifyPayment(req: Request, res: Response) {
    const {sessionId} = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
}

export const stripeController = {
    payment, 
    verifyPayment
}