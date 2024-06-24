import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

const OrderExport = () =>{
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5050/order');
      const data = await response.json();
      setOrderData(data);
    }

    fetchData();
  }, []);

  const handleExportClick = () => {
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    
      const date = new Date(dateString);
      if (date.getTime() === 0) {
        return "-";
      }
    
      return date.toLocaleDateString(undefined, options);
    };


    if (orderData.length > 0) {
      const headers = ['Order ID', 'User ID', 'Payment ID', 'Full Name', 'Phone', 'Email', 'Order Status', 'Order Date', 'Complete Date', 'Total Price', 'Shipping Address', 'Billing Address'];
      const csvData = orderData.map(item => ({
        'Order ID': `"${item._id.$oid}"`,
        'User ID': `"${item.userid}"`,
        'Payment ID': `"${item.paymentid}"`,
        'Full Name': `"${item.fullName}"`,
        'Phone': `"${item.phone}"`,
        'Email': `"${item.email}"`,
        'Order Status': `"${item.orderStatus}"`,
        'Order Date': formatDate(item.orderDate),
        'Complete Date': formatDate(item.completeDate),
        'Total Price': item.totalPrice,
        'Shipping Address': `"${item.shippingAddress}"`,
        'Billing Address': `"${item.billingAddress}"`,
      }));
  
      const allColumns = [...headers, ...Object.keys(csvData[0]).filter(key => !headers.includes(key))];
      const csvString = [
        allColumns.join(','),
        ...csvData.map(item => allColumns.map(col => item[col] || '').join(',')),
      ].join('\n');
  
      const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '');
  
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `OrderDataExport_${currentDate}.csv`);
    }
  };

  return(
    <button className="btn btn-block bg-primary text-white font-weight-bold mt-n2" onClick={handleExportClick}>
      <i className="fas fa-download pr-2" /> Export Data
    </button>
  );
};

export default OrderExport;