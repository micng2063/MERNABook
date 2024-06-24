import React, { useEffect, useState } from "react";

const FilterSubject = ({ onSubjectChange }) => {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await fetch(`http://localhost:5050/inventory/`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const itemData = await response.json();
        setItemData(itemData);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getItems();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const uniqueSubjects = Array.from(new Set(itemData.flatMap((item) => item.subject || [])));

  return (
    <div>
      <form>
        <select className="form-control" onChange={(e) => onSubjectChange(e.target.value === "All Subjects" ? null : e.target.value)}>
          <option value="All Subjects">All Subjects</option>
          {uniqueSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
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
          <option value="lowPrice">Price Low to High</option>
          <option value="highPrice">Price High to Low</option>
          <option value="alphabetic">Alphabetic A - Z</option>
          <option value="lowQuantity">Quantity Low to High</option>
          <option value="highQuantity">Quantity High to Low</option>
          <option value="hideListing">Hidden Listing</option>
        </select>
      </form>
    </div>
  );
};

export { FilterSubject, FilterPrice, Sort };
