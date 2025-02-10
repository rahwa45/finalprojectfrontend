import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cashier = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5559/api/prescriptions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions", error);
      }
    };

    fetchPrescriptions();
  }, [token, navigate]);

  const handleSelectPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setPaymentAmount(prescription.totalCost); // Assuming totalCost is a field in the prescription
  };

  const handlePayment = async () => {
    if (!selectedPrescription) return;

    try {
      const response = await axios.post(
        `http://localhost:5559/api/prescriptions/${selectedPrescription._id}/pay`,
        {
          amount: paymentAmount,
          method: paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setInvoice(response.data.invoice);
      alert("Payment processed successfully!");
    } catch (error) {
      console.error("Error processing payment", error);
      alert("Failed to process payment.");
    }
  };

  return (
    <div>
      <h2>Cashier</h2>
      <div>
        <h3>Select Prescription</h3>
        <table className="table table-bordered table-hover shadow-50 w-75">
          <thead className="table-danger">
            <tr>
              <th className="border fs-5 text-center">Patient Name</th>
              <th className="border fs-5 text-center">Total Cost</th>
              <th className="border fs-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription._id}>
                <td>{prescription.patientName}</td>
                <td>${prescription.totalCost}</td>
                <td>
                  <button
                    onClick={() => handleSelectPrescription(prescription)}
                    className="btn btn-primary"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPrescription && (
        <div>
          <h3>Process Payment</h3>
          <div>
            <p>
              <strong>Patient Name:</strong> {selectedPrescription.patientName}
            </p>
            <p>
              <strong>Total Cost:</strong> ${selectedPrescription.totalCost}
            </p>
            <div>
              <label>
                Payment Amount:
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="form-control"
                />
              </label>
            </div>
            <div>
              <label>
                Payment Method:
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-control"
                >
                  <option value="cash">Cash</option>
                  <option value="credit">Credit Card</option>
                  <option value="insurance">Insurance</option>
                </select>
              </label>
            </div>
            <button onClick={handlePayment} className="btn btn-success mt-3">
              Process Payment
            </button>
          </div>
        </div>
      )}

      {invoice && (
        <div>
          <h3>Invoice</h3>
          <p>
            <strong>Invoice ID:</strong> {invoice._id}
          </p>
          <p>
            <strong>Patient Name:</strong> {invoice.patientName}
          </p>
          <p>
            <strong>Total Paid:</strong> ${invoice.amountPaid}
          </p>
          <p>
            <strong>Payment Method:</strong> {invoice.paymentMethod}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cashier;
