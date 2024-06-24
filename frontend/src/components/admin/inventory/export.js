import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

const InventoryExport = () =>{
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5050/inventory');
      const data = await response.json();
      setInventoryData(data);
    }

    fetchData();
  }, []);

  const handleExportClick = () => {
    if (inventoryData.length > 0) {
      const headers = ['ISBN', 'Title', 'Description', 'Edition', 'Author', 'Publisher', 'Publication Year', 'Quantity', 'Price', 'Subject', 'Image URL', 'Rating', 'Rating Total'];
      const csvData = inventoryData.map(item => ({
        'ISBN': `"${item.isbn}"`,
        'Title': `"${item.title}"`,
        'Description': `"${item.description}"`,
        'Edition': `"${item.edition}"`,
        'Author': `"${item.author}"`,
        'Publisher': `"${item.publisher}"`,
        'Publication Year': `"${item.publicationYear}"`,
        'Quantity': item.quantity,
        'Price': item.price,
        'Subject': `"${item.subject}"`,
        'Image URL': `"${item.imageurl}"`,
        'Rating': item.rating,
        'Rating Total': item.ratingTotal
      }));
      
      const allColumns = [...headers, ...Object.keys(csvData[0]).filter(key => !headers.includes(key))];
      const csvString = [
        allColumns.join(','),
        ...csvData.map(item => allColumns.map(col => item[col] || '').join(',')),
      ].join('\n');

      const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '');

      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `InventoryDataExport_${currentDate}.csv`);
    }
  };

  return(
    <button className="btn btn-block bg-primary text-white font-weight-bold  mt-n2" onClick={handleExportClick}>
      <i className="fas fa-download pr-2" /> Export Data
    </button>
  );
};

export default InventoryExport;