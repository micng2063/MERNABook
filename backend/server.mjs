import express from "express";
import cors from "cors";
import fs from 'fs';
import path from 'path';

import "./loadEnvironment.mjs";
import inventory from "./routes/inventory.mjs";
import user from "./routes/user.mjs";

import payment from "./routes/payment.mjs";
import order from "./routes/order.mjs";
import sales from "./routes/sales.mjs";
import email from "./routes/email.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/inventory", inventory);
app.use("/order", order);
app.use("/user", user);
app.use("/payment", payment);
app.use("/sales", sales);

const htmlDirectory = path.resolve(process.cwd(), "html");
const htmlTemplate = fs.readFileSync(path.join(htmlDirectory, "orderConfirmation.html"),"utf8");

app.post('/email/order', async (req, res) => {
  try {
    const { to, subject, order } = req.body; 
    const html = htmlTemplate
    .replace('{{orderId}}', order._id)
    .replace('{{orderId2}}', order._id)
    .replace('{{orderEmail}}', order.email)
    .replace('{{orderName}}', order.fullName)
    .replace('{{orderPhone}}', order.phone)
    .replace('{{orderDate}}', order.orderDate)
    .replace('{{orderStatus}}', order.orderStatus)
    .replace('{{orderTotal}}', order.totalPrice)
    .replace('{{orderSubtotal}}', order.subtotalPrice)
    .replace('{{orderShipping}}', order.shippingPrice)
    .replace('{{orderTax}}', order.taxPrice)
    .replace('{{orderShippingAddress}}', order.shippingAddress)
    .replace('{{orderBillingAddress}}', order.billingAddress);

    const maskedOrderId = btoa(order._id);
    const orderUrl = `http://localhost:3000/order/${maskedOrderId}`;
    
    const finalHtml = html.replace('{{orderUrl}}', orderUrl);

    const result = await email(to, subject, null, finalHtml); 
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/email/inquiry', async (req, res) => {
  try {
    const { to, subject, text } = req.body; 
    const result = await email(to, subject, text, null); 
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/email/status', async (req, res) => {
  try {
    const { to, subject, text } = req.body; 
    const result = await email(to, subject, text, null); 
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
