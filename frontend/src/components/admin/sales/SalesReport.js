import React, { useState, useEffect } from 'react';

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalMargin, setTotalMargin] = useState(0);
  const [marginRate, setMarginRate] = useState(0);

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
    let totalSalesAmount = 0;
    let totalOrdersCount = 0;
    let totalCostCount = 0;
    let totalMarginAmount = 0;

    salesData.forEach(data => {
      totalSalesAmount += data.totalSales;
      totalOrdersCount += data.totalOrders;
      totalCostCount += data.totalCost;
      totalMarginAmount += (data.totalSales - data.totalCost);
    });

    setTotalSales(totalSalesAmount);
    setTotalOrders(totalOrdersCount);
    setTotalCost(totalCostCount);
    setTotalMargin(totalMarginAmount);
    setMarginRate(totalMarginAmount / totalSalesAmount * 100 || 0);
  }, [salesData]);

  // eslint-disable-next-line
  const [orderData, setOrderData] = useState([]);
  const [orderedToday, setOrderedToday] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  useEffect(() => {
    async function getOrderData() {
      try {
        const response = await fetch(`http://localhost:5050/order/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const orders = await response.json();

        const orderedToday = orders.filter(order => {
          const orderDate = new Date(order.orderDate);
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - 1);
          return orderDate.toDateString() === currentDate.toDateString();
        });

        const totalPrices = orders.map(order => parseFloat(order.totalPrice));
        const averagePrice = totalPrices.reduce((total, price) => total + price, 0) / orders.length;

        setOrderData(orders);
        setOrderedToday(orderedToday.length);
        setAveragePrice(averagePrice);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    }
    getOrderData();
  }, []);


  return (
    <div>
      <div class="row pb-2">
        <div class="col-md-4 px-2 py-2">
          <div class="bg-light p-3 text-center">
            <h2 class="text-dark mb-3 hover-zoom-large">{orderedToday}</h2>
            <h6 class="text-primary text-uppercase">Order Placed Today</h6>
          </div>
        </div>
        <div class="col-md-4 px-2 py-2">
          <div class="bg-light p-3 text-center">
            <h2 class="text-dark mb-3 hover-zoom-large">${totalSales.toFixed(2)}</h2>
            <h6 class="text-primary text-uppercase">Total Sales</h6>
          </div>
        </div>
        <div class="col-md-4 px-2 py-2">
          <div class="bg-light p-3 text-center">
            <h2 class="text-dark mb-3 hover-zoom-large">{totalOrders}</h2>
            <h6 class="text-primary text-uppercase">Total Order</h6>
          </div>
        </div>
        <div class="col-md-3 px-2 py-2">
          <div class="bg-light p-2 text-center pt-3">
            <h4 class="text-dark mb-3 hover-zoom-medium">${totalCost.toFixed(2)}</h4>
            <h6 class="text-primary text-uppercase">Total Cost</h6>
          </div>
        </div>
        <div class="col-md-3 px-2 py-2">
          <div class="bg-light p-2 text-center pt-3">
            <h4 class="text-dark mb-3 hover-zoom-medium">${totalMargin.toFixed(2)}</h4>
            <h6 class="text-primary text-uppercase">Total Margin</h6>
          </div>
        </div>
        <div class="col-md-3 px-2 py-2">
          <div class="bg-light p-2 text-center pt-3">
            <h4 class="text-dark mb-3 hover-zoom-medium">{marginRate.toFixed(2)}%</h4>
            <h6 class="text-primary text-uppercase">Margin Rate</h6>
          </div>
        </div>
        <div class="col-md-3 px-2 py-2">
          <div class="bg-light p-2 text-center pt-3">
            <h4 class="text-dark mb-3 hover-zoom-medium">${averagePrice.toFixed(2)}</h4>
            <h6 class="text-primary text-uppercase">Avg. Basket Price</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
