import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { saveAs } from 'file-saver';

const SalesMargin = () => {
  const [salesData, setSalesData] = useState([]);
  const [interval, setInterval] = useState('last6Months'); // Default to last 6 months

  useEffect(() => {
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
    getSalesData();
  }, []);

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

    const margins = filteredSalesData.map(data => data.totalSales - data.totalCost);
    // eslint-disable-next-line
    const totalMargin = margins.reduce((acc, curr) => acc + curr, 0);

    const marginPercentageData = [];
    for (let i = 0; i < margins.length; i++) {
      if (i === 0) {
        marginPercentageData.push(0);
      } else {
        const marginIncrease = margins[i] - margins[i - 1];
        const marginPercentageIncrease = (marginIncrease / margins[i - 1]) * 100;
        marginPercentageData.push(Math.round(marginPercentageIncrease * 100) / 100);
      }
    }

    const ctx = document.getElementById('margin');

    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Total Margin ',
            data: margins,
            yAxisID: 'margin',
            borderColor: '#17a2b8',
            backgroundColor: '#17a2b8',
            borderWidth: 3
          },
          {
            label: 'Margin % Increase ',
            data: marginPercentageData,
            yAxisID: 'marginPercentage',
            borderColor: '#ffc107',
            backgroundColor: '#ffc107',
            borderWidth: 3
          }
        ]
      },
      options: {
        scales: {
          margin: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            suggestedMin: Math.min(...margins) - 200,
            suggestedMax: Math.max(...margins) + 200,
            ticks: {
              stepSize: 500,
              callback: function (value, index, values) {
                return '$' + value;
              }
            }
          },
          marginPercentage: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
              callback: function (value, index, values) {
                return value + '%';
              }
            }
          },
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, [salesData, interval]);

  const saveChart = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '');
    const canvas = document.getElementById('margin');
    const fileName = `SalesMargin_${interval.charAt(0).toUpperCase() + interval.slice(1)}`;
    canvas.toBlob(function (blob) {
      saveAs(blob, `${fileName}_${currentDate}.png`);
    });
  };

  const exportData = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '');
    const csv = salesData.map(data => `${data.month},${data.year},${data.totalSales},${data.totalOrders}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `SalesMargin_${currentDate}.csv`);
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <select class="form-control mr-3" value={interval} onChange={e => setInterval(e.target.value)}>
          <option value="allTime">All Time</option>
          <option value="thisYear">This Year</option>
          <option value="lastYear">Last Year</option>
          <option value="last6Months">Last 6 Months</option>
          <option value="last3Months">Last 3 Months</option>
        </select>
        <button className="btn bg-primary text-white mb-3 mr-1" onClick={saveChart}><i class="fas fa-save pr-1"></i></button>
        <button className="btn bg-primary text-white mb-3 mr-1" onClick={exportData}><i class="fas fa-download pr-1"></i></button>
      </div>

      <div>
        <canvas id="margin" width="400" height="300"></canvas>
      </div>
    </div>
  );
};

export default SalesMargin;
