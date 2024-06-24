import React from "react";
import './status.css';

const OrderStatus = ({ orderStatus }) => {
  const statusValues = {
    "Pending": 1,
    "Ordered": 2,
    "Preparing": 3,
    "Delivering": 4,
    "Complete": 5
  };

  const getStatusClass = (status) => {
    return statusValues[status] <= statusValues[orderStatus] ? "active step0" : "step0";
  };

  const statusClasses = {
    "Pending": statusValues["Pending"] <= statusValues[orderStatus] ? { fontWeight: "bold", color: "#17a2b8" } : {},
    "Ordered": statusValues["Ordered"] <= statusValues[orderStatus] ? { fontWeight: "bold", color: "#17a2b8" } : {},
    "Preparing": statusValues["Preparing"] <= statusValues[orderStatus] ? { fontWeight: "bold", color: "#17a2b8" } : {},
    "Delivering": statusValues["Delivering"] <= statusValues[orderStatus] ? { fontWeight: "bold", color: "#17a2b8" } : {},
    "Complete": statusValues["Complete"] <= statusValues[orderStatus] ? { fontWeight: "bold", color: "#17a2b8" } : {},
  };

  const statusText = {
    "Pending": statusValues["Pending"] <= statusValues[orderStatus] ? "Received" : "Pending",
    "Ordered": statusValues["Ordered"] <= statusValues[orderStatus] ? "Processed" : "Processing",
    "Preparing": statusValues["Preparing"] <= statusValues[orderStatus] ? "Prepared" : "Preparing",
    "Delivering": statusValues["Delivering"] <= statusValues[orderStatus] ? "Delivered" : "En Route",
    "Complete": statusValues["Complete"] <= statusValues[orderStatus] ? "Complete" : "Arriving",
  };

  const statusImage = {
    "Pending": statusValues["Pending"] <= statusValues[orderStatus] ? "https://i.imgur.com/Uv9OY7Z.png" : "https://i.imgur.com/JVEILON.png",
    "Ordered": statusValues["Ordered"] <= statusValues[orderStatus] ? "https://i.imgur.com/OsanVER.png" : "https://i.imgur.com/5QA6PXb.png",
    "Preparing": statusValues["Preparing"] <= statusValues[orderStatus] ? "https://i.imgur.com/Hddi8Ub.png" : "https://i.imgur.com/ojRBkJx.png",
    "Delivering": statusValues["Delivering"] <= statusValues[orderStatus] ? "https://i.imgur.com/ZJqw4qD.png" : "https://i.imgur.com/1klXlfw.png",
    "Complete": statusValues["Complete"] <= statusValues[orderStatus] ? "https://i.imgur.com/B1UknR9.png" : "https://i.imgur.com/g5DlDeT.png",
  };

  return (
    <div className="status" style={{ marginRight: "40px" }}>
      <div className="container px-md-4 pb-3 mx-auto">
        <div className="card">
          <div className="row d-flex justify-content-center">
            <div className="col-12">
              <ul className="progressbar text-center">
                {Object.keys(statusValues).map((status, index) => (
                  <li key={index} className={getStatusClass(status)}></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row justify-content-between top">
            <div className="row d-flex icon-content">
              <img className="icon" src={statusImage["Pending"]} alt="Status" />
              <div className="d-flex flex-column">
                <p style={statusClasses["Pending"]}>Order <br/>{statusText["Pending"]}</p>
              </div>
            </div>
            <div className="row d-flex icon-content">
              <img className="icon" src={statusImage["Ordered"]} alt="Status" />
              <div className="d-flex flex-column">
                <p style={statusClasses["Ordered"]}>Order <br/>{statusText["Ordered"]}</p>
              </div>
            </div>
            <div className="row d-flex icon-content">
              <img className="icon" src={statusImage["Preparing"]} alt="Status" />
              <div className="d-flex flex-column">
                <p style={statusClasses["Preparing"]}>Order <br/>{statusText["Preparing"]}</p>
              </div>
            </div>
            <div className="row d-flex icon-content">
              <img className="icon" src={statusImage["Delivering"]} alt="Status" />
              <div className="d-flex flex-column">
                <p style={statusClasses["Delivering"]}>Order <br/>{statusText["Delivering"]}</p>
              </div>
            </div>
            <div className="row d-flex icon-content">
              <img className="icon" src={statusImage["Complete"]} alt="Status" />
              <div className="d-flex flex-column">
                <p style={statusClasses["Complete"]}>Order <br/>{statusText["Complete"]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
