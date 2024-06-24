import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("sales");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("sales");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  let newDocument = {
    month: req.body.month,
    year: req.body.year,
    totalSales: req.body.totalSales,
    totalCost: req.body.totalCost,
    totalOrders: req.body.totalOrders,
    weeks: req.body.weeks,
    access: req.body.access,
  };
  let collection = await db.collection("sales");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      month: req.body.month,
      year: req.body.year,
      totalSales: req.body.totalSales,
      totalCost: req.body.totalCost,
      totalOrders: req.body.totalOrders,
      weeks: req.body.weeks,
      access: req.body.access,
    }
  };

  let collection = await db.collection("sales");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("sales");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;