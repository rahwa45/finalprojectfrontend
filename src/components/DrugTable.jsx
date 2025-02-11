import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Footer from "./Footer";

const DrugTable = () => {
  const [drugs, setDrugs] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get(
          "https://finalproject-backend-eta.vercel.app/api/drugs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDrugs(response.data);
      } catch (error) {
        console.error(
          "Error fetching drugs",
          error.response?.data || error.message
        );
      }
    };
    fetchDrugs();
  }, [token]);
  return (
    <div className="d-flex justify-content-center flex-column mx-5">
      <BackButton />
      <h2 className="my-4">Drug Inventory</h2>
      <table className="table table-bordered table-hover shadow-50 w-75">
        <thead className="table-primary">
          <tr>
            <th className="border fs-5 text-center">Name</th>
            <th className="border fs-5 text-center">Quantity</th>
            <th className="border fs-5 text-center">Price</th>
            <th className="border fs-5 text-center">Operations</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug._id}>
              <td className="border fs-5 text-center">{drug.name}</td>
              <td className="border fs-5 text-center">{drug.quantity}</td>
              <td className="border fs-5 text-center">{drug.price}$</td>
              <td>
                <div className="d-flex justify-content-center gap-x-4 align-items-center addlink">
                  <Link to={`/drugs/add`} className="mx-4">
                    AddDrug
                  </Link>
                  <Link to={`/drugs/update/${drug._id}`} className="mx-4">
                    UpdateDrug
                  </Link>
                  <Link to={`/drugs/delete/${drug._id}`} className="mx-4">
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="foot d-flex align-items-end">
        <Footer />
      </div>
    </div>
  );
};

export default DrugTable;
