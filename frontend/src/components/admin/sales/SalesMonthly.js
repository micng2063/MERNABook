import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { saveAs } from 'file-saver';

const SalesOrder = () => {
  const [salesData, setSalesData] = useState([]);
  const [interval, setInterval] = useState('last6Months'); // Default to last 6 months

  async function getSalesData() {
    try {
      const response = await fetch(`http://localhost:5050/sales/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const sales = await response.json();
      setSalesData(sales.filter(data => data.access === 1));
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  }

  useEffect(() => {
    getSalesData();
  }, []);

  const refreshSales = () => {
    getSalesData();
  }

  useEffect(() => {
    if (!salesData.length) return;

    let filteredSalesData = [];

    switch (interval) {
      case 'last3Months':
        filteredSalesData = salesData.slice(-3);
        break;
      case 'last6Months':
        filteredSalesData = salesData.slice(-6);
        break;
      case 'thisYear':
        filteredSalesData = salesData.filter(data => data.year === new Date().getFullYear());
        break;
      case 'lastYear':
        filteredSalesData = salesData.filter(data => data.year === new Date().getFullYear() - 1);
        break;
      case 'allTime':
        filteredSalesData = salesData;
        break;
      default:
        filteredSalesData = salesData.slice(-6);
    }

    const months = filteredSalesData.map(data => `${data.month.substring(0, 3)} ${data.year.toString().substring(2)}`);
    const sales = filteredSalesData.map(data => data.totalSales);
    const orders = filteredSalesData.map(data => data.totalOrders);
    const costs = filteredSalesData.map(data => data.totalCost);

    const ctx = document.getElementById('monthly');

    if (!ctx) return;
    const maxSales = Math.max(...sales);
    const upperBoundSales = maxSales + 500;

    const minOrders = Math.min(...orders);
    const maxOrders = Math.max(...orders);
    const lowerBoundOrders = Math.max(0, minOrders - 10);
    const upperBoundOrders = maxOrders + 10;

    const minCost = Math.min(...costs);
    const lowerBoundCosts = Math.max(0, minCost - 500);

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Total Sales ',
            data: sales,
            yAxisID: 'sales',
            borderColor: '#17a2b8',
            backgroundColor: '#17a2b8',
            borderWidth: 3
          },
          {
            label: 'Total Orders ',
            data: orders,
            yAxisID: 'orders',
            borderColor: '#ffc107',
            backgroundColor: '#ffc107',
            borderWidth: 3
          },
          {
            label: 'Total Cost ',
            data: costs,
            yAxisID: 'costs',
            borderColor: '#dc3545',
            backgroundColor: '#dc3545',
            borderWidth: 3,
          }
        ]
      },
      options: {
        scales: {
          sales: {
            type: 'linear',
            position: 'left',
            beginAtZero: false,
            suggestedMin: lowerBoundCosts,
            suggestedMax: upperBoundSales,
            ticks: {
              stepSize: 500,
              callback: function (value, index, values) {
                return '$' + value;
              }
            }
          },
          orders: {
            type: 'linear',
            position: 'right',
            beginAtZero: false,
            suggestedMin: lowerBoundOrders,
            suggestedMax: upperBoundOrders,
            ticks: {
              stepSize: 10
            }
          },
          costs: {
            type: 'linear',
            position: 'right',
            display: false,
            suggestedMin: lowerBoundCosts,
            suggestedMax: upperBoundSales,
          }
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, [salesData, interval]);

  const saveChart = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '');
    const canvas = document.getElementById('monthly');
    const fileName = `SalesReport_${interval.charAt(0).toUpperCase() + interval.slice(1)}`;
    canvas.toBlob(function (blob) {
      saveAs(blob, `${fileName}_${currentDate}.png`);
    });
  };

  const exportData = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '');
    const csv = salesData.map(data => `${data.month},${data.year},${data.totalSales},${data.totalOrders}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `SalesReport_${currentDate}.csv`);
  };

  return (
    <div>
      <h5 className="section-title position-relative text-uppercase mb-3 pb-1">
        <span className="bg-secondary pr-4">Monthly Sales Report</span>
        <i className="fas fa-sync fa-xs ml-n3" style={{ cursor: 'pointer' }} onClick={refreshSales}></i>
      </h5>
      <div class="bg-light px-3 py-3">
        <div className="d-flex justify-content-end">
          <select class="form-control mr-3" style={{ width: "30%" }} value={interval} onChange={e => setInterval(e.target.value)}>
            <option value="allTime">All Time</option>
            <option value="thisYear">This Year</option>
            <option value="lastYear">Last Year</option>
            <option value="last6Months">Last 6 Months</option>
            <option value="last3Months">Last 3 Months</option>
          </select>
          <button className="btn bg-primary text-white mb-3 mr-1" onClick={saveChart}><i class="fas fa-save pr-1"></i>Save Chart</button>
          <button className="btn bg-primary text-white mb-3 mr-1" onClick={exportData}><i class="fas fa-download pr-1"></i>Export Data</button>
        </div>

        <div>
          <canvas id="monthly" width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

export default SalesOrder;
