import React from "react";

const FilterStatus = ({ onStatusChange }) => {
  const orderStatuses = ["All Status", "Pending", "Ordered", "Preparing", "Delivering", "Complete"];

  return (
    <div>
      <form>
        <select className="form-control" onChange={(e) => onStatusChange(e.target.value === "All Status" ? null : e.target.value)}>
          {orderStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

const FilterPrice = ({ onPriceChange }) => {
  const itemPriceRanges = [
    { label: "All Prices", value: "" },
    { label: "$0 - $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200 and above", value: "200-5000" },
  ];

  return (
    <div>
      <form>
        <select className="form-control" onChange={(e) => onPriceChange(e.target.value !== "" ? [e.target.value] : [])}>
          {itemPriceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

const Sort = ({ onSort }) => {
  return (
    <div className="d-flex align-items-end justify-content-end mb-4">
      <form>
        <select className="form-control" onChange={(e) => onSort(e.target.value)} defaultValue="">
          <option value="" disabled hidden>Sort By</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
          <option value="alphabetic">Alphabetic A - Z</option>
          <option value="newest">Newest Order</option>
          <option value="oldest">Oldest Order</option>
          <option value="status">Status Order</option>
        </select>
      </form>
    </div>
  );
};

export { FilterStatus, FilterPrice, Sort };
