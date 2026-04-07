import { Request, Response } from "express";
import { stripeService } from "./stripe.service"

async function payment(req: Request, res: Response) {
    try {
        const {products} = req.body;
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
        const result = await stripeService.payment(lineItems as any);
        res.send({id: result.id, url: result.url}) 
    } catch(error: any) {
        res.send(error);
    }
}

export const stripeController = {
    payment
}