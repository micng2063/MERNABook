import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TextEditor from "../../general/textEditor/textEditor";
import TextPreview from "../../general/textEditor/textPreview";

const Edit = ({ id, handleSwitchOff }) => {
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
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/inventory/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const inventory = await response.json();
      if (!inventory) {
        window.alert(`Inventory item with id ${id} not found`);
        handleSwitchOff();
        return;
      }

      setForm(inventory);
    }

    fetchData();

    return;
  }, [id, navigate, handleSwitchOff]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedItem = {
      isbn: form.isbn,
      title: form.title,
      description: form.description,
      edition: form.edition,
      author: form.author,
      publisher: form.publisher,
      publicationYear: form.publicationYear,
      quantity: form.quantity,
      price: form.price,
      category: form.category,
      subject: form.subject,
      rating: form.rating,
      ratingTotal: form.ratingTotal,
      imageurl: form.imageurl,
      showListing: form.showListing,
    };

    await fetch(`http://localhost:5050/inventory/${id}`, {
      method: "PATCH",
      body: JSON.stringify(editedItem),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    handleSwitchOff();
  }

  async function deleteItem(e) {
    e.preventDefault();
    const deleteItem = {
      id: form._id,
    };

    console.error("Trying to delete item: ", id);
    
    try {
      await fetch(`http://localhost:5050/inventory/${id}`, {
        method: "DELETE",
        body: JSON.stringify(deleteItem),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      handleSwitchOff();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
  
  return (
    <div class="container-fluid pb-5 pt-3">
      <form>
        <div class="row">
          <div class="col-lg-8">
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
                    type="number"
                    step="0.1"
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

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label className="mr-2">Description</label>
                <div className="d-flex">
                  <div className="pr-1">
                    <TextEditor />
                  </div>
                  <div className="pr-1">
                    <TextPreview form={form} />
                  </div>
                </div>
              </div>
              <textarea
                className="form-control"
                id="description"
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
                rows={6}
              />
            </div>

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
            <div class="row">
              <div class="col-md-6">
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
              <div class="col-md-3"><div className="form-group">
                <label htmlFor="publicationYear">Publish. Year</label>
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
                    id="edition"
                    value={form.edition}
                    onChange={(e) => updateForm({ edition: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
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
          </div>

          <div class="col-lg-4">
            <div class="align-center pb-3">
              <img style={{ width: "20vw" }} src={form.imageurl} alt="Textbook" />
            </div>
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

            <div className="form-group">
              <label>Show Listing</label>
              <div class="row">
                <div class="col-md-6">
                  <label>
                    <input
                      type="radio"
                      value={true}
                      checked={form.showListing}
                      onChange={(e) => updateForm({ showListing: e.target.value === "true" })}
                    />
                    <i className="fa fa-eye px-2"></i>Show
                  </label>
                </div>
                <div class="col-md-6">
                  <label>
                    <input
                      type="radio"
                      value={false}
                      checked={!form.showListing}
                      onChange={(e) => updateForm({ showListing: e.target.value === "true" })}
                    />
                    <i className="fa fa-eye-slash px-2"></i>Hide
                  </label>
                </div>
              </div>
            </div>

            <button class="btn btn-block bg-primary text-white" onClick={onSubmit}>
              <i className="fa fa-edit pr-3"></i>Update item
            </button>

            <button class="btn btn-block bg-primary text-white" onClick={deleteItem}>
              <i className="fa fa-trash pr-3"></i>Delete item
            </button>
          </div>
        </div>
      </form >
    </div >
  );
}

export default Edit;