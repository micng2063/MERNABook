import React, { useState, useEffect } from 'react';
import SalesExport from './SalesExport';

const SalesLogModal = ({ onClose }) => {
  const [form, setForm] = useState({
    month: new Date().toLocaleString('en-us', { month: 'long' }),
    year: new Date().getFullYear(),
    totalSales: 0.0,
    totalCost: 0.0,
    totalOrders: 0,
    weeks: [
      { week: 1, startDate: null, endDate: null, sales: 0.0, orders: 0 },
    ],
    access: 1,
  });

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [data, setData] = useState([]);
  const [newlyAddedWeekIndex, setNewlyAddedWeekIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5050/sales/');
      const data = await response.json();
      setData(data);

      const entry = data.find(item => item.month === form.month && item.year === form.year);

      if (entry) {
        setForm({
          ...entry,
          weeks: entry.weeks.map(week => ({
            ...week,
          })),
        });
        setSelectedEntry(entry);
      }
      
    }

    fetchData();
  }, [form.month, form.year]);

  const handleSelectChange = (e) => {
    const selectedMonth = e.target.value.split('-')[0];
    const selectedYear = parseInt(e.target.value.split('-')[1]);

    setForm({
      ...form,
      month: selectedMonth,
      year: selectedYear,
    });
  };

  async function onSubmit(e) {
    e.preventDefault();

    const newItem = {
      month: form.month,
      year: form.year,
      totalSales: parseFloat(form.totalSales),
      totalCost: parseFloat(form.totalCost),
      totalOrders: parseInt(form.totalOrders),
      access: form.access,
      weeks: form.weeks.map(week => ({
        ...week,
        startDate: week.startDate,
        endDate: week.endDate,
        sales: parseFloat(week.sales),
        orders: parseInt(week.orders),
      })),
    };

    updateMonth();
    await fetch(`http://localhost:5050/sales/${selectedEntry._id}`, {
      method: 'PATCH',
      body: JSON.stringify(newItem),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const addWeek = () => {
    if (form.weeks.length < 4) {
      const newWeek = { week: form.weeks.length + 1, startDate: null, endDate: null, sales: 0, orders: 0 };
      setForm(prev => ({ ...prev, weeks: [...prev.weeks, newWeek] }));
      setNewlyAddedWeekIndex(prev => form.weeks.length);
    }
  };

  const removeWeek = (index) => {
    const updatedWeeks = form.weeks.filter((_, i) => i !== index).map((week, i) => ({ ...week, week: i + 1 }));
    setForm(prev => ({ ...prev, weeks: updatedWeeks }));
  };

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5050/order');
      const data = await response.json();
      setOrderData(data);
    }

    fetchData();
  }, []);

  const updateMonth = () => {
    const monthIndex = new Date(Date.parse(form.month + ' 1, ' + form.year)).getMonth();
    const startDate = new Date(form.year, monthIndex, 1);
    const endDate = new Date(form.year, monthIndex + 1, 0);

    const filteredOrders = orderData.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= startDate && orderDate <= endDate;
    });

    const totalSales = filteredOrders.reduce((acc, order) => acc + parseFloat(order.totalPrice), 0);
    const totalOrders = filteredOrders.length;

    setForm({
      ...form,
      totalSales,
      totalOrders,
    });
  };

  const updateWeek = (startDate, endDate, index) => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const filteredOrders = orderData.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDateObj && orderDate <= endDateObj;
      });

      const totalSales = filteredOrders.reduce((acc, order) => acc + parseFloat(order.totalPrice), 0);
      const totalOrders = filteredOrders.length;

      setForm({
        ...form,
        weeks: form.weeks.map((week, i) =>
          i === index ? { ...week, sales: totalSales, orders: totalOrders } : week
        ),
      });
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ overflowY: "auto", maxHeight: "90vh" }}>
          <div className="modal-header">
            <h5 className="modal-title">Log Sales Data</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div class="col-md-5">
                  <div className="form-group">
                    <label htmlFor="selectEntry">Select Entry:</label>
                    <select id="selectEntry" className="form-control" value={`${form.month}-${form.year}`} onChange={handleSelectChange}>
                      {data.filter(item => item.access === 1).map((item, index) => (
                        <option key={index} value={`${item.month}-${item.year}`}>
                          {`${item.month} ${item.year}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="month"><b>Month</b></label>
                    <input type="text" className="form-control" id="month" readOnly
                      value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="year"><b>Year</b></label>
                    <input type="number" className="form-control" id="year" readOnly
                      value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="totalSales"><b>Total Sales</b></label>
                    <input type="number" className="form-control" id="totalSales" readOnly
                      value={(form.totalSales).toFixed(2)} onChange={(e) => setForm({ ...form, totalSales: e.target.value })} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="totalCost"><b>Total Costs</b></label>
                    <input type="number" className="form-control" id="totalCost"
                      value={form.totalCost} onChange={(e) => setForm({ ...form, totalCost: e.target.value })} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="totalOrders"><b>Total Orders</b></label>
                    <input type="number" className="form-control" id="totalOrders" readOnly
                      value={form.totalOrders} onChange={(e) => setForm({ ...form, totalOrders: e.target.value })} />
                  </div>
                </div>
              </div>
              {form.weeks.map((weekData, index) => (
                <div key={index} className={`form-group ${index === newlyAddedWeekIndex ? 'show' : ''}`}>
                  <div className="d-flex justify-content-between align-items-center pb-2" data-toggle="collapse" data-target={`#week${weekData.week}`}>
                    <label><b>{`Week ${weekData.week}`}</b></label>
                    <button className="btn bg-primary text-white ml-auto"
                      onClick={() => { updateWeek(weekData.startDate, weekData.endDate, index) }}>
                      <i className="fas fa-book pr-2"></i>Log this Week
                    </button>
                    <button type="button" className="btn bg-danger text-white ml-2" onClick={() => removeWeek(index)}>
                      <i className="fas fa-times pr-2"></i>Remove
                    </button>
                  </div>
                  <div className="collapse" id={`week${weekData.week}`}>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label>Start Date</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Start Date"
                          value={weekData.startDate || ""}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              weeks: form.weeks.map((week, i) =>
                                i === index ? { ...week, startDate: e.target.value } : week
                              ),
                            });
                          }}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>End Date</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="End Date"
                          value={weekData.endDate || ""}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              weeks: form.weeks.map((week, i) =>
                                i === index ? { ...week, endDate: e.target.value } : week
                              ),
                            });
                          }}
                        />
                      </div>

                      <div className="col-md-6 form-group">
                        <label>Sales</label>
                        <input type="number" className="form-control" placeholder="Sales" value={weekData.sales} readOnly
                          onChange={(e) =>
                            setForm({
                              ...form,
                              weeks: form.weeks.map((week, i) =>
                                i === index ? { ...week, sales: e.target.value } : week
                              ),
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Order</label>
                        <input type="number" className="form-control" placeholder="Orders" value={weekData.orders} readOnly
                          onChange={(e) =>
                            setForm({
                              ...form,
                              weeks: form.weeks.map((week, i) =>
                                i === index ? { ...week, orders: e.target.value } : week
                              ),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" border-bottom pb-2"></div>
                </div>
              ))}
              <div className="form-group">
                {form.weeks.length < 4 && (
                  <button type="button" className="btn bg-primary text-white mb-3 mr-1" onClick={addWeek}>
                    <i className="fas fa-plus pr-2"></i>Add Week
                  </button>
                )}
                <button type="submit" className="btn bg-primary text-white mb-3 mr-1" onClick={(e) => { onSubmit(e); onClose(); }}>
                  <i className="fas fa-save pr-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const SalesLog = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-left">
        <button className="btn bg-primary text-white mb-3 mr-1  mt-n2" onClick={handleLogClick}>
          <i className="fas fa-book pr-1"></i> Log Sales Data
        </button>
        <SalesExport />
      </div>
      {showModal && <SalesLogModal onClose={closeModal} />}
    </div>
  );
};

export default SalesLog;
