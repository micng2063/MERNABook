import React from 'react';
import Footer from '../footer/footer';

const Home = () => {
  return (
    <div>
      <div class="container-fluid mb-3">
        <div class="row px-xl-5">
          <div class="col-lg-8">
            <div class="product-offer mb-30" style={{ height: "430px" }}>
              <img class="img-fluid" src="https://i.imgur.com/mcWbIrQ.png" alt="Texbook" />
              <div class="offer-text hover-zoom-medium">
                <h1 class="display-3 text-white mb-3 font-weight-bolder ">Mern A Book</h1>
                <p class="mx-md-5 px-5 py-2 text-white text-center bg-primary" style={{ opacity: "0.85" }}>We make buying textbooks easy and affordable. Shop our library of over one million titles and learn anytime. </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="product-offer mb-30" style={{ height: "200px" }}>
              <img class="img-fluid" src="https://i.imgur.com/flcovvh.jpeg" alt="Texbook" />
              <div class="offer-text">
                <h6 class="text-white text-uppercase">See what's new in store</h6>
                <h3 class="text-white mb-3 hover-zoom-medium">New Arrivals</h3>
                <a href="/shop" class="btn bg-primary text-white">Shop Now</a>
              </div>
            </div>
            <div class="product-offer mb-20" style={{ height: "200px" }}>
              <img class="img-fluid" src="https://i.imgur.com/S4t86LK.jpeg" alt="Texbook" />
              <div class="offer-text">
                <h6 class="text-white text-uppercase">Save 20%</h6>
                <h3 class="text-white mb-3 hover-zoom-medium">Special Offer</h3>
                <a href="/shop" class="btn bg-primary text-white">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row px-xl-5 py-2 bg-light ">
          <div class="col-lg-3 col-md-6 col-sm-12 pb-1 pr-1 border-right">
            <div class="d-flex align-items-center hover-zoom-medium" style={{ padding: "30px" }}>
              <i class="fa fa-check fa-lg text-primary m-0 mr-4 "></i>
              <h5 class="font-weight-semi-bold m-0">Quality Product</h5>
            </div>
            <p class="text-center pr-1"> Search through our textbook collection by title, author, publisher, or ISBN number to find what you need.</p>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 pb-1 pr-1 border-right">
            <div class="d-flex align-items-center hover-zoom-medium" style={{ padding: "30px" }}>
              <i class="fa fa-shipping-fast fa-lg text-primary m-0 mr-4"></i>
              <h5 class="font-weight-semi-bold m-0">Free Shipping</h5>
            </div>
            <p class="text-center pr-1">Your book doesn't have to wait. Earn a free and fast, 1-3 day delivery on orders over $35.</p>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 pb-1 pr-1 border-right">
            <div class="d-flex align-items-center hover-zoom-medium" style={{ padding: "30px" }}>
              <i class="fas fa-exchange-alt fa-lg text-primary m-0 mr-4"></i>
              <h5 class="font-weight-semi-bold m-0 text-center">14-Day Return</h5>
            </div>
            <p class="text-center pr-1">If you're not happy with your textbook purchase, send it back within 30 days for a full refund.</p>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div class="d-flex align-items-center hover-zoom-medium" style={{ padding: "30px" }}>
              <i class="fa fa-comments fa-lg text-primary m-0 mr-4"></i>
              <h5 class="font-weight-semi-bold m-0">Chat Support</h5>
            </div>
            <p class="text-center">Have a question for us? Choose a help topic, get quick answers or chat with our automated assistant.</p>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5">
        <div className="row px-xl-5 text-center">
          <div className="col">
            <div className="p-4 d-inline-block hover-zoom-medium">
              <img src="https://i.imgur.com/OqTNM8C.png" style={{ height: "50px" }} alt="Texbook" />
            </div>
            <div className="p-4 d-inline-block hover-zoom-medium">
              <img src="https://i.imgur.com/qAWraqD.png" style={{ height: "50px" }} alt="Texbook" />
            </div>
            <div className="p-4 d-inline-block hover-zoom-medium">
              <img src="https://i.imgur.com/4MDn7Iq.png" style={{ height: "50px" }} alt="Texbook" />
            </div>
            <div className="p-4 d-inline-block hover-zoom-medium">
              <img src="https://i.imgur.com/Isf42Mb.png" style={{ height: "50px" }} alt="Wiley" />
            </div>
            <div className="p-4 d-inline-block hover-zoom-medium">
              <img src="https://i.imgur.com/27rk5TJ.png" style={{ height: "50px" }} alt="Texbook" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
