import express from "express";
import stripePackage from "stripe";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const stripeConnection = process.env.STRIPE_SECRET_TEST || "";
const stripe = new stripePackage(stripeConnection);

router.post("/", async (req, res) => {
    let { amount, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "MERNTextBook",
            payment_method: id,
            confirm: true,
            return_url: 'http://localhost:3000/shop/checkout'
        });
        //console.log(payment);
        
        res.json({
            message: "Payment successful",
            success: true
        });
    } catch (error) {
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false
        });
    }
});


export default router;
