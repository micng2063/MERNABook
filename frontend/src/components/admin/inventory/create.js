import React, { useState } from "react";

export default function Create({ setShowCreate }) {
  const [form, setForm] = useState({
    isbn: "",
    title: "",
    description: "",
    edition: "",
    author: "",
    publisher: "",
    publicationYear: "",
    quantity: "",
    price: 0.0,
    subject: "",
    rating: 0.0,
    ratingTotal: 0,
    imageurl: "",
    showListing: false,
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newInventory = { ...form };

    await fetch("http://localhost:5050/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInventory),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({
      isbn: "",
      title: "",
      description: "",
      edition: "",
      author: "",
      publisher: "",
      publicationYear: "",
      quantity: "",
      price: "",
      subject: "",
      rating: 0.0,
      ratingTotal: 0,
      imageurl: "",
      showListing: true,
    });

    setShowCreate(false);
  }

  return (
    <div class="px-3">
      <form onSubmit={onSubmit}>
        <div class="row">
          <div class="col-md-6">
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                value={form.isbn}
                onChange={(e) => updateForm({ isbn: e.target.value })}
              />
            </div>
          </div>
          <div class="col-md-3">
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={form.price}
                onChange={(e) => updateForm({ price: e.target.value })}
              />
            </div>
          </div>
          <div class="col-md-3">
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                className="form-control"
                id="quantity"
                value={form.quantity}
                onChange={(e) => updateForm({ quantity: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={form.title}
                onChange={(e) => updateForm({ title: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={form.author}
                onChange={(e) => updateForm({ author: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3">
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                className="form-control"
                id="publisher"
                value={form.publisher}
                onChange={(e) => updateForm({ publisher: e.target.value })}
              />
            </div>
          </div>
          <div class="col-md-3">
            <div className="form-group">
              <label htmlFor="publicationYear">Publication Year</label>
              <input
                type="text"
                className="form-control"
                id="publicationYear"
                value={form.publicationYear}
                onChange={(e) => updateForm({ publicationYear: e.target.value })}
              />
            </div>
          </div>
          <div class="col-md-3">
            <div className="form-group">
              <label htmlFor="edition">Edition</label>
              <input
                type="text"
                className="form-control"
                id="publicationYear"
                value={form.edition}
                onChange={(e) => updateForm({ edition: e.target.value })}
              />
            </div>
          </div>
          <div class="col-md-3">
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                value={form.subject}
                onChange={(e) => updateForm({ subject: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div className="form-group">
              <label htmlFor="imageurl">Image URL</label>
              <input
                type="text"
                className="form-control"
                id="imageurl"
                value={form.imageurl}
                onChange={(e) => updateForm({ imageurl: e.target.value })}
              />
            </div>
          </div>
          <div class="col-md-3">
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                id="rating"
                value={form.rating}
                onChange={(e) => updateForm({ rating: parseFloat(e.target.value) })}
              />
            </div>
          </div>
          <div class="col-md-3">
            <div className="form-group">
              <label htmlFor="ratingTotal">Rating #</label>
              <input
                type="number"
                className="form-control"
                id="ratingTotal"
                value={form.ratingTotal}
                onChange={(e) => updateForm({ ratingTotal: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block bg-primary text-white font-weight-bold mt-n2" onClick={() => setShowCreate(true)}>
            <i className="fas fa-plus pr-2" />Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
