export function PaymentType() {
  return (
    <div class="row">
      <div className="col-md-4 form-group">
        <div className="custom-control custom-radio">
          <input type="radio" className="custom-control-input" name="payment" id="paypal" />
          <label className="custom-control-label" htmlFor="paypal">Paypal</label>
        </div>
      </div>
      <div className="col-md-4 form-group">
        <div className="custom-control custom-radio">
          <input type="radio" className="custom-control-input" name="payment" id="directcheck" />
          <label className="custom-control-label" htmlFor="directcheck">Direct Check</label>
        </div>
      </div>
      <div className="col-md-4 form-group">
        <div className="custom-control custom-radio">
          <input type="radio" className="custom-control-input" name="payment" id="creditdebit" />
          <label className="custom-control-label" htmlFor="creditdebit">Credit or Debit Card</label>
        </div>
      </div>
    </div>
  );
};

export default PaymentType;