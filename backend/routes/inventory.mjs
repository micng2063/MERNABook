import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("inventory");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("inventory");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  let newDocument = {
    isbn: req.body.isbn,
    title: req.body.title,
    description: req.body.description,
    edition: req.body.edition,
    author: req.body.author,
    publisher: req.body.publisher,
    publicationYear: req.body.publicationYear,
    quantity: req.body.quantity,
    price: req.body.price,
    subject: req.body.subject,
    rating: req.body.rating,
    ratingTotal: req.body.ratingTotal,
    imageurl: req.body.imageurl,
    showListing: req.body.showListing,
  };
  let collection = await db.collection("inventory");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      isbn: req.body.isbn,
      title: req.body.title,
      description: req.body.description,
      edition: req.body.edition,
      author: req.body.author,
      publisher: req.body.publisher,
      publicationYear: req.body.publicationYear,
      quantity: req.body.quantity,
      price: req.body.price,
      subject: req.body.subject,
      rating: req.body.rating,
      ratingTotal: req.body.ratingTotal,
      imageurl: req.body.imageurl,
      showListing: req.body.showListing,
    }
  };

  let collection = await db.collection("inventory");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("inventory");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;