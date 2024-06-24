const Address = () => {
  return (
    <div class="row">
      <div class="col-md-6">
        <h5>Billing Address</h5>
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
  );
};

export default Address;