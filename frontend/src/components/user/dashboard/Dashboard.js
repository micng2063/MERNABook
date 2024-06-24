import Account from "./Account";
import Address from "./Address";
import UserBar from "./UserBar";
import Order from "./Order";

const Dashboard = () => {
  return (
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-md-3">
          <UserBar />
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
            <div class="tab-pane fade" id="orders-tab" role="tabpanel" aria-labelledby="orders-nav">
              <Order />
            </div>
            <div class="tab-pane fade" id="security-tab" role="tabpanel" aria-labelledby="security-nav">
            <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Security</span>
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum quam ac mi viverra dictum. In
                efficitur ipsum diam, at dignissim lorem tempor in. Vivamus tempor hendrerit finibus. Nulla tristique
                viverra nisl, sit amet bibendum ante suscipit non. Praesent in faucibus tellus, sed gravida lacus.
                Vivamus eu diam eros. Aliquam et sapien eget arcu rhoncus scelerisque.
              </p>
            </div>
            <div class="tab-pane fade" id="account-tab" role="tabpanel" aria-labelledby="account-nav">
            <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">My Information</span>
              </h5>
              <Account /><h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">My Address</span>
              </h5>
              <Address />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;