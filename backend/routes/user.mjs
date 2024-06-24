import express from "express";
import db from "../db/conn.mjs";
//import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("user");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:code", async (req, res) => {
  let collection = await db.collection("user");
  let query = {code: req.params.code};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  let newDocument = {
    code: req.body.code,
    orderid: [],
    name: "",
    lastName: "",
    email: "",
    phone: 0,
    role: 0,
  };
  let collection = await db.collection("user");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

router.patch("/:code", async (req, res) => {
  let query = {code: req.params.code};
  const updates =  {
    $set: {
      code: req.body.code,
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      orderid: req.body.orderid,
      role: req.body.role,
    }
  };

  let collection = await db.collection("user");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

router.delete("/:code", async (req, res) => {
  let query = {code: req.params.code};

  const collection = db.collection("user");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;