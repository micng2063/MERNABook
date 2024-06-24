import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("order");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("order");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  let newDocument = {
      userid: req.body.userid,
      paymentid: req.body.paymentid,
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      product: req.body.product,
      orderDate: new Date(req.body.orderDate),
      orderStatus: "Pending",
      completeDate: new Date(req.body.completeDate),
      shippingAddress: req.body.shippingAddress,
      billingAddress: req.body.billingAddress,
      totalPrice: req.body.totalPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      subtotalPrice: req.body.subtotalPrice,
  };
  let collection = await db.collection("order");
  let result = await collection.insertOne(newDocument);

  res.send({ insertedId: result.insertedId }).status(204);
});


router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      userid: req.body.userid,
      paymentid: req.body.paymentid,
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      product: req.body.product,
      orderDate: new Date(req.body.orderDate),
      orderStatus: req.body.orderStatus,
      completeDate: new Date(req.body.completeDate),
      shippingAddress: req.body.shippingAddress,
      billingAddress: req.body.billingAddress,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      subtotalPrice: req.body.subtotalPrice,
      totalPrice: req.body.totalPrice,
    }
  };

  let collection = await db.collection("order");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("order");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;