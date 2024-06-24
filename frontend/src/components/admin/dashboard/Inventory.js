import { useState } from "react";

import Products from "../inventory/products";
import Create from "../inventory/create";
import InventoryExport from "../inventory/export";

const Inventory = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      {showCreate ? (
        <div className="row mb-2">
          <div className="col-md-9">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Inventory</span>
            </h5>
          </div>
          <div className="col-md-3">
            <button className="btn btn-block bg-primary text-white font-weight-bold" onClick={() => setShowCreate(false)}>
              Back to Inventory
            </button>
          </div>
        </div>
      ) : (
        <div className="row mb-2">
          <div className="col-md-6">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-1">Inventory</span>
            </h5>
          </div>

          <div className="col-md-3 mb-2">
            <button className="btn btn-block bg-primary text-white font-weight-bold mt-n2" onClick={() => setShowCreate(true)}>
              <i className="fas fa-plus pr-2" />Add new Product
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <InventoryExport />
          </div>
        </div>
      )}
      {showCreate ? <Create setShowCreate={setShowCreate} /> : <Products />}
    </div>
  );
};

export default Inventory;
