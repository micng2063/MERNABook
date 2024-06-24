import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

const SalesExport = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5050/sales');
      const data = await response.json();
      setSalesData(data);
    }

    fetchData();
  }, []);

  const calculateMargin = (totalSales, totalCost) => {
    return totalSales - totalCost;
  };

  const calculateMarginPercentage = (margin, totalSales) => {
    return (margin / totalSales) * 100;
  };

  const handleExportClick = () => {
    if (salesData.length > 0) {
      const headers = ['Month', 'Year', 'TotalSales', 'TotalCost', 'TotalOrders', 'Margin', 'MarginPercentage'];
      const csvData = salesData
        .filter(item => item.access === 1) 
        .map(item => {
          const margin = calculateMargin(item.totalSales, item.totalCost);
          const marginPercentage = calculateMarginPercentage(margin, item.totalSales);
          const weeksData = {};
          item.weeks.forEach(week => {
            weeksData[`Week ${week.week} Sale`] = week.sales;
            weeksData[`Week ${week.week} Order`] = week.orders;
          });
          return {
            Month: item.month,
            Year: item.year,
            TotalSales: item.totalSales,
            TotalCost: item.totalCost,
            TotalOrders: item.totalOrders,
            Margin: margin,
            MarginPercentage: marginPercentage.toFixed(2) + '%',
            ...weeksData,
          };
        });
  
      const allColumns = [...headers, ...Object.keys(csvData[0]).filter(key => !headers.includes(key))];
      const csvString = [
        allColumns.join(','),
        ...csvData.map(item => allColumns.map(col => item[col] || '').join(',')),
      ].join('\n');
  
      const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '');
  
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `SalesDataExport_${currentDate}.csv`);
    }
  };
  
  return (
    <button className="btn bg-primary text-white mb-3 mt-n2" onClick={handleExportClick}>
      <i className="fas fa-download pr-1" /> Export Data
    </button>
  );
};

export default SalesExport;
