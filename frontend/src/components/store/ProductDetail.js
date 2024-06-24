import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useShoppingCart } from "../shoppingCart/CartContext";
import '../../css/style.css';
import ProductSuggestion from "./ProductSuggestion";

const Item = () => {
  const [itemData, setItemData] = useState({
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

  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5050/inventory/${params.id}`);

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const item = await response.json();
        if (!item) {
          window.alert(`Item with id ${params.id} not found`);
          return;
        }

        setItemData(item);
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    fetchData();
  }, [params.id]);

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();
  const quantity = getItemQuantity(params.id);

  const shortenDescription = (description) => {
    const sentences = description.split(/\.|\?|!/);

    if (sentences.length < 2) {
      return description;
    }

    const firstTwoSentences = sentences.slice(0, 2).join('.');
    const wordCount = firstTwoSentences.split(/\s+/).length;

    if (wordCount < 30) {
      return sentences.slice(0, 3).join('.') + '.';
    } else if (wordCount > 40) {
      return sentences[0] + '.';
    }

    return firstTwoSentences + '.';
  };


  return (
    <div>
      <div class="container-fluid" style={{ width: "90vw" }}>

        <div class="row px-xl-5">
          <div class="col-lg-5 mb-30 pt-5">
            <img class="img-fluid" src={itemData.imageurl} alt="Textbook" />
          </div>
          <div class="col-lg-7 h-auto mb-30">
            <div class="nav nav-tabs">
              <a class="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Information</a>
              <a class="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">More Details</a>
            </div>

            <div class="tab-content bg-light p-30" style={{ overflowY: "auto", height: "92%" }}>
              <div class="tab-pane fade show active" id="tab-pane-1">
                <h3>{itemData.title}</h3>
                <div class="d-flex mb-3 align-items-center justify-content-center ">
                  <div class="text-primary mr-2">
                    <small class="fas fa-star"></small>
                    <small class="fas fa-star"></small>
                    <small class="fas fa-star"></small>
                    <small class="fas fa-star-half-alt"></small>
                    <small class="far fa-star"></small>
                  </div>
                  <small class="pt-1">({itemData.ratingTotal} Reviews)</small>
                </div>
                <h3 class="font-weight-semi-bold mb-4">${itemData.price}</h3>
                <p className="mb-4" style={{ fontSize: "15px" }} dangerouslySetInnerHTML={{ __html: shortenDescription(itemData.description) }}></p>
                <div class="d-flex mb-4">
                  <strong class="text-dark mr-3">Type:</strong>
                  <form>
                    <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" id="color-1" name="color" />
                      <label class="custom-control-label" for="color-1">Hardcover</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" id="color-2" name="color" />
                      <label class="custom-control-label" for="color-2">Paperback</label>
                    </div>
                  </form>
                </div>
                <div class="d-flex align-items-center mb-4 pt-2">
                  <div class="input-group quantity mr-3  w-50">
                    <div class="input-group-btn">
                      <button class="btn bg-primary btn-minus" onClick={() => decreaseCartQuantity(params.id)}>
                        <i class="fa fa-minus text-white"></i>
                      </button>
                    </div>
                    <input type="text" class="form-control bg-secondary border-0 text-center" value={quantity} />
                    <div class="input-group-btn">
                      <button class="btn bg-primary btn-plus" onClick={() => increaseCartQuantity(params.id)}>
                        <i class="fa fa-plus text-white"></i>
                      </button>
                    </div>
                  </div>
                  <button class="btn bg-primary  px-3 w-50" onClick={() => increaseCartQuantity(params.id)}>
                    <i class="fa fa-shopping-cart mr-1 text-white"></i><span class="text-white">Add To Cart</span>
                  </button>
                </div>
              </div>

              <div class="tab-pane fade" id="tab-pane-2">
                <div>
                  <h4 class="mb-3">Additional Information</h4>
                  <p className="mb-4" dangerouslySetInnerHTML={{ __html: shortenDescription(itemData.description) }}></p>
                  <div class="row border-bottom">
                    <div class="col-md-2">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item px-0 "><span class="font-weight-bold text-primary">Author:</span></li>
                      </ul>
                    </div>
                    <div class="col-md-10">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item px-0"><span class="float-right text-right">{itemData.author}</span></li>
                      </ul>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item px-0">
                          <span class="font-weight-bold text-primary">ISBN:</span> <span class="float-right">{itemData.isbn}</span>
                        </li>
                        <li class="list-group-item px-0">
                          <span class="font-weight-bold text-primary">Language:</span> <span class="float-right">English</span>
                        </li>
                        <li class="list-group-item px-0">
                          <span class="font-weight-bold text-primary">In Stock:</span> <span class={`float-right ${itemData.quantity < 10 ? 'text-danger font-weight-bold' : ''}`}>{itemData.quantity < 10 ? 'Low in Stock' : 'In Stock'}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-6">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item px-0">
                          <span class="font-weight-bold text-primary">Publisher:</span> <span class="float-right">{itemData.publisher}</span>
                        </li>
                        <li class="list-group-item px-0">
                          <span class="font-weight-bold text-primary">Publication Year:</span> <span class="float-right">{itemData.publicationYear}</span>
                        </li>
                        <li class="list-group-item px-0">
                          <span class="font-weight-bold text-primary">Edition:</span> <span class="float-right">{itemData.edition}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="d-flex pt-4">
                    <strong class="text-dark mr-2">Share on:</strong>
                    <div class="d-flex justify-content-center">
                      <div class="d-inline-flex">
                        <a class="text-dark px-2 hover-zoom-medium" href={`/shop/item/${itemData._id}`}>
                          <i class="fab fa-facebook-f"></i>
                        </a>
                        <a class="text-dark px-2 hover-zoom-medium" href={`/shop/item/${itemData._id}`}>
                          <i class="fab fa-twitter"></i>
                        </a>
                        <a class="text-dark px-2 hover-zoom-medium" href={`/shop/item/${itemData._id}`}>
                          <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a class="text-dark px-2 hover-zoom-medium" href={`/shop/item/${itemData._id}`}>
                          <i class="fab fa-pinterest"></i>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row px-xl-5">
          <div class="col">
            <div class="bg-light p-30">
              <div class="tab-content">
                <div>
                  <h4 class="mb-3">Product Description</h4>
                  <p className="mb-3" style={{ lineHeight: "2em" }} dangerouslySetInnerHTML={{ __html: itemData.description }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4">
          <h3 class="section-title position-relative text-uppercase mx-xl-5 mb-3">
            <span class="bg-secondary pr-3">You May Also Like</span>
          </h3>
          <div class="row px-xl-5">
            <ProductSuggestion subject={itemData.subject}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
