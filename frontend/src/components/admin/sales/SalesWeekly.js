import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { saveAs } from 'file-saver';

const SalesWeekly = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');

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

    const filteredSalesData = salesData.filter(data => data.month === selectedMonth);
    const weeks = filteredSalesData.map(data => data.weeks).flat();

    const weekLabels = weeks.map(week => `Week ${week.week}`);
    const sales = weeks.map(week => week.sales);
    const orders = weeks.map(week => week.orders);

    const ctx = document.getElementById('weekly');

    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weekLabels,
        datasets: [
          {
            label: 'Total Sales ',
            data: sales,
            yAxisID: 'sales',
            borderColor: '#17a2b8',
            backgroundColor: '#17a2b8',
          },
          {
            label: 'Total Orders ',
            data: orders,
            yAxisID: 'orders',
            borderColor: '#ffc107',
            backgroundColor: '#ffc107',
          },
        ]
      },
      options: {
        scales: {
          sales: {
            type: 'linear',
            position: 'left',
            beginAtZero: false,
            suggestedMin: 0,
            suggestedMax: Math.max(...sales) + 100,
            ticks: {
              stepSize: 200,
              callback: function (value, index, values) {
                return '$' + value;
              }
            }
          },
          orders: {
            type: 'linear',
            position: 'right',
            beginAtZero: false,
            suggestedMin: 0,
            suggestedMax: Math.max(...orders) + 10,
            ticks: {
              stepSize: 10
            }
          },
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, [salesData, selectedMonth]);

  const saveChart = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '');
    const canvas = document.getElementById('weekly');
    const fileName = `SalesWeekly_${selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}`;
    canvas.toBlob(function (blob) {
      saveAs(blob, `${fileName}_${currentDate}.png`);
    });
  };

  const exportData = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '');
    const csv = salesData.map(data => `${data.month},${data.year},${data.totalSales},${data.totalOrders}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `SalesWeekly_${currentDate}.csv`);
  };

  const monthOptions = salesData
    .map(data => ({ month: data.month, year: data.year }))
    .sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      } else {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months.indexOf(a.month) - months.indexOf(b.month);
      }
    })
    .map(item => `${item.month}`);

  return (
    <div>
      <h5 className="section-title position-relative text-uppercase mb-3 pb-1">
        <span className="bg-secondary pr-4">Weekly Sales Report</span>
        <i className="fas fa-sync fa-xs ml-n3" style={{ cursor: 'pointer' }} onClick={refreshSales}></i>
      </h5>
      <div class="bg-light p-3 m-2">
        <div className="d-flex justify-content-end">
          <select className="form-control mr-3" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            {monthOptions.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <button className="btn bg-primary text-white mb-3 mr-1" onClick={saveChart}><i className="fas fa-save"></i></button>
          <button className="btn bg-primary text-white mb-3 mr-1" onClick={exportData}><i className="fas fa-download pr-1"></i></button>
        </div>

        <div>
          <canvas id="weekly" width="400" height="300"></canvas>
        </div>
      </div>
    </div>
  );
};

export default SalesWeekly;
