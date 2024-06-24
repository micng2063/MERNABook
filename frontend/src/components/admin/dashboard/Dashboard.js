import AdminBar from "./AdminBar";
import Inventory from "./Inventory";
import Account from "./Account";
import Order from "./Order";
import Sales from "./Sales";

const Dashboard = () => {
  return (
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-md-3">
          <AdminBar />
        </div>
        <div class="col-md-9">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="dashboard-tab" role="tabpanel" aria-labelledby="dashboard-nav">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Dashboard</span>
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum quam ac mi viverra dictum. In
                efficitur ipsum diam, at dignissim lorem tempor in. Vivamus tempor hendrerit finibus. Nulla tristique
                viverra nisl, sit amet bibendum ante suscipit non. Praesent in faucibus tellus, sed gravida lacus.
                Vivamus eu diam eros. Aliquam et sapien eget arcu rhoncus scelerisque.
              </p>
            </div>
            <div className="tab-pane fade" id="orders-tab" role="tabpanel" aria-labelledby="orders-nav">
              <Order />
            </div>
            <div className="tab-pane fade" id="product-tab" role="tabpanel" aria-labelledby="product-nav">
              <Inventory />
            </div>
            <div class="tab-pane fade" id="statistic-tab" role="tabpanel" aria-labelledby="statistic-nav">
              <Sales />
            </div>
            <div class="tab-pane fade" id="account-tab" role="tabpanel" aria-labelledby="account-nav">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">My Information</span>
              </h5>
              <Account/>
              <div class="row">
                <div class="col-md-6">
                  <h5>Payment Address</h5>
                  <p>123 Payment Street, Los Angeles, CA</p>
                  <p>Mobile: 012-345-6789</p>
                  <button className="btn btn-block bg-primary text-white font-weight-bold my-3">Edit Address</button>
                </div>
                <div class="col-md-6">
                  <h5>Shipping Address</h5>
                  <p>123 Shipping Street, Los Angeles, CA</p>
                  <p>Mobile: 012-345-6789</p>
                  <button className="btn btn-block bg-primary text-white font-weight-bold my-3">Edit Address</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;