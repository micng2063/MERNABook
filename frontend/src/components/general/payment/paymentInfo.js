import React, { useState } from 'react';

const CardDetails = () => {
  const cardDetails = [
    { brand: 'Visa', number: '4242 4242 4242 4242', cvc: 'Any 3 Digits' },
    { brand: 'Visa (Debit)', number: '4000 0566 5566 5556', cvc: 'Any 3 Digits' },
    { brand: 'Mastercard', number: '5555 5555 5555 4444', cvc: 'Any 3 Digits' },
    { brand: 'Mastercard (2-series)', number: '2223 0031 2200 3222', cvc: 'Any 3 Digits' },
    { brand: 'Mastercard (Debit)', number: '5200 8282 8282 8210', cvc: 'Any 3 Digits' },
    { brand: 'Mastercard (Prepaid)', number: '5105 1051 0510 5100', cvc: 'Any 3 Digits' },
    { brand: 'American Express', number: '3782 822463 10005', cvc: 'Any 4 Digits' },
    { brand: 'American Express', number: '3714 496353 98431', cvc: 'Any 4 Digits' },
    { brand: 'Discover', number: '6011 1111 1111 1117', cvc: 'Any 3 Digits' },
    { brand: 'Discover', number: '6011 0009 9013 9424', cvc: 'Any 3 Digits' },
    { brand: 'Discover (Debit)', number: '6011 9811 1111 1113', cvc: 'Any 3 Digits' },
    { brand: 'Diners Club', number: '3056 9300 0902 0004', cvc: 'Any 3 Digits' },
    { brand: 'Diners Club', number: '3622 720627 1667', cvc: 'Any 3 Digits' },
    { brand: 'BCcard', number: '6555 9000 0060 4105', cvc: 'Any 3 Digits' },
    { brand: 'JCB', number: '3566 0020 2036 0505', cvc: 'Any 3 Digits' },
    { brand: 'UnionPay', number: '6200 0000 0000 0005', cvc: 'Any 3 Digits' },
    { brand: 'UnionPay (Debit)', number: '6200 0000 0000 0047', cvc: 'Any 3 Digits' },
    { brand: 'UnionPay', number: '6205 5000 0000 0000 004', cvc: 'Any 3 Digits' },
  ];

  const [copyIndex, setCopyIndex] = useState(null);

  const copyNumber = (number, index) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopyIndex(index);
      setTimeout(() => {
        setCopyIndex(null);
      }, 3500);
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped" style={{ fontSize: "13px" }}>
        <thead className="table table-striped">
          <tr className="thead-dark">
            <th>Card Brand</th>
            <th>Card Number</th>
            <th>CVC</th>
          </tr>
        </thead>
        <tbody>
          {cardDetails.map((card, index) => (
            <tr key={index}>
              <td>{card.brand}</td>
              <td>
                <span className={`${copyIndex === index ? 'text-success' : ''}`} onClick={() => copyNumber(card.number, index)}>{card.number}</span>
                <i className={`fa fa-paste pl-2 ${copyIndex === index ? 'text-success' : ''}`} onClick={() => copyNumber(card.number, index)}></i>
                {copyIndex === index && <span className="text-success ml-2">Copied!</span>}
              </td>
              <td>{card.cvc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PaymentInfo = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (e) => {
    setShowModal(true);
    e.preventDefault();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <label>Card Number
        <i className="fas fa-info-circle pl-2" style={{ cursor: 'pointer' }} onClick={handleOpenModal}></i>
      </label>

      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Mock Payment</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(80vh - 120px)' }}>
                <p>To simulate a successful payment, use test cards from the following list. The billing country for each test card is set to the United States. </p>
                <p>You may select any future date for the expiration date when simulating a successful payment.</p>
                <CardDetails />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentInfo;
