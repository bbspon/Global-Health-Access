import React, { useEffect, useState } from "react";
import axios from "axios";

const PurchaseSummaryPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get("/api/user/my-plans").then((res) => setPlans(res.data));
  }, []);

  const downloadInvoice = (id) => {
    window.open(`/api/invoice/${id}`, "_blank");
  };

  return (
    <div className="container py-4">
      <h4>Your Purchased Plans</h4>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Amount</th>
            <th>Purchase Date</th>
            <th>Payment Mode</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.planId.title}</td>
              <td>₹{plan.pricePaid}</td>
              <td>{new Date(plan.createdAt).toLocaleDateString()}</td>
              <td>{plan.paymentMethod}</td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => downloadInvoice(plan._id)}
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseSummaryPage;
