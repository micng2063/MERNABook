import SaleMonthly from "../sales/SalesMonthly";
import SalesReport from "../sales/SalesReport";
import SalesWeekly from "../sales/SalesWeekly";
import SalesMargin from "../sales/SalesMargin";
import SalesLog from "../sales/SalesLog";
import SalesSubject from "../sales/SalesSubject";

const Sales = () => {
  return (
    <div class="pb-3">
      <div class="row">
        <div class="col-md-7">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Sales Report</span>
          </h5>
        </div>
        <div class="col-md-5 pl-5">
          <SalesLog />
        </div>
      </div>

      <div class="px-3 pb-3">
        <SalesReport />
      </div>

      <div>
        <SaleMonthly />
      </div>

      <div class="row pt-3">
        <div class="col-md-6">
          <h5 className="section-title position-relative text-uppercase mb-3 pb-1">
            <span className="bg-secondary pr-3">Sales Report</span>
          </h5>
          <div class="bg-light p-3 m-2">
            <SalesMargin />
          </div>
        </div>

        <div class="col-md-6">
          <SalesWeekly />
        </div>
      </div>

      <div class="pb-3">
        <SalesSubject />
      </div>
    </div>
  );
};

export default Sales;