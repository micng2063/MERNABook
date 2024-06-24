import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import inventory from "./routes/inventory.mjs";
import order from "./routes/order.mjs";
import user from "./routes/user.mjs";
import payment from "./routes/payment.mjs";
import sales from "./routes/sales.mjs";

const PORT = 5050;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/inventory", inventory);
app.use("/order", order);
app.use("/user", user);
app.use("/sales", sales);
app.use("/payment", payment);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});