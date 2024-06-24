import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesSubject = () => {
  const [orderData, setOrderData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const chartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    async function fetchOrderData() {
      const response = await fetch('http://localhost:5050/order');
      const data = await response.json();
      setOrderData(data);
    }

    async function fetchItemData() {
      const response = await fetch('http://localhost:5050/inventory');
      const data = await response.json();
      setItemData(data);
    }

    fetchOrderData();
    fetchItemData();
  }, []);

  useEffect(() => {
    if (orderData.length > 0 && itemData.length > 0) {
      const subjectQuantityMap = {};

      orderData.forEach(order => {
        order.product.forEach(product => {
          const { itemID, quantity } = product;
          const item = itemData.find(item => item._id === itemID);
          if (item) {
            if (subjectQuantityMap[item.subject]) {
              subjectQuantityMap[item.subject] += quantity;
            } else {
              subjectQuantityMap[item.subject] = quantity;
            }
          }
        });
      });

      const subjectDataArray = Object.entries(subjectQuantityMap).map(([subject, totalQuantity]) => ({
        subject,
        totalQuantity,
      }));

      setSubjectData(subjectDataArray);
    }
  }, [orderData, itemData]);

  useEffect(() => {
    if (subjectData.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const labels = subjectData.map(item => item.subject);
      const data = subjectData.map(item => item.totalQuantity);

      chartRef.current.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Quantity: ',
              data: data,
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384',
              ],
              borderColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384',
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }, [subjectData]);

  useEffect(() => {
    if (orderData.length > 0 && itemData.length > 0) {
      const productQuantityMap = {};

      orderData.forEach(order => {
        order.product.forEach(product => {
          const { itemID, quantity } = product;
          if (productQuantityMap[itemID]) {
            productQuantityMap[itemID] += quantity;
          } else {
            productQuantityMap[itemID] = quantity;
          }
        });
      });

      const top10Products = Object.entries(productQuantityMap)
        .sort(([, quantityA], [, quantityB]) => quantityB - quantityA)
        .slice(0, 10)
        .map(([itemID, quantity]) => {
          const item = itemData.find(item => item._id === itemID);
          return item ? { title: item.title, quantity } : null;
        })
        .filter(item => item !== null);
      function shortenTitle(title, maxLength) {
        if (title.length <= maxLength) {
          return title;
        }

        let shortenedTitle = title.substring(0, maxLength);
        const lastSpaceIndex = shortenedTitle.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
          shortenedTitle = shortenedTitle.substring(0, lastSpaceIndex);
        }

        return shortenedTitle;
      }

      const labels = top10Products.map(item => shortenTitle(item.title, 30));
      const data = top10Products.map(item => item.quantity);

      const ctx = barChartRef.current.getContext('2d');

      if (barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }
      barChartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Quantity: ',
              data: data,
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
              ],
              borderColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              anchor: 'end',
              align: 'end',
              labels: {
                title: {
                  font: {
                    weight: 'bold'
                  }
                }
              },
            }
          },
        },
      });



    }
  }, [orderData, itemData]);

  return (
    <div class="row pt-3">
      <div class="col-md-5">
        <h5 className="section-title position-relative text-uppercase mb-3 pb-1">
          <span className="bg-secondary pr-3">Subjects Distribution</span>
        </h5>
        <div class="bg-light p-3 m-2">
          <canvas ref={chartRef} width="300" height="400"></canvas>
        </div>
      </div>

      <div class="col-md-7">
        <h5 className="section-title position-relative text-uppercase mb-3 pb-1">
          <span className="bg-secondary pr-3">Most Sold Textbooks</span>
        </h5>
        <div class="bg-light p-3 m-2">
          <canvas ref={barChartRef} width="300" height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

export default SalesSubject;
