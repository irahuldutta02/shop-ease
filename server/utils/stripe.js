import { Stripe } from "stripe";
import { CLIENT_URL, STRIPE_SECRET_KEY } from "../config/server.config.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

const stripeUtil = (app) => {
  app.post("/create-checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.orderItems.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 100, // cents
          },
          quantity: item.qty,
        })),
        success_url: `${CLIENT_URL}/order/${req.body.orderId}`,
        cancel_url: `${CLIENT_URL}/order/${req.body.orderId}`,
      });
      res.json({ url: session.url });
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  });
};

export default stripeUtil;
