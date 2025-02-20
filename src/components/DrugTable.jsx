import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Footer from "./Footer";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa"; // Import icons for buttons

const DrugTable = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1);
  const [drugsPerPage] = useState(10); // Show 10 drugs per page
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get(
          "https://finalproject-backend-zagu.onrender.com/api/drugs",
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

  // Filter drugs based on search query
  const filteredDrugs = drugs.filter((drug) =>
    drug.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastDrug = currentPage * drugsPerPage;
  const indexOfFirstDrug = indexOfLastDrug - drugsPerPage;
  const currentDrugs = filteredDrugs.slice(indexOfFirstDrug, indexOfLastDrug);
  const totalPages = Math.ceil(filteredDrugs.length / drugsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex justify-content-center flex-column mx-5">
      <BackButton />
      <div className="d-flex flex-row justify-content-between w-75">
        <h2 className="">Drug Inventory</h2>
        {/* Search Input */}
        <div>
          <input
            type="text"
            className="form-control rounded-4 w-100"
            placeholder="Search by drug name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Link to={`/drugs/add`} className="text-success fs-5">
        <FaPlus />
      </Link>

      <table className="table table-bordered table-hover shadow-sm w-75 mt-3">
        <thead className="table-primary">
          <tr>
            <th className="border fs-5 px-4">Name</th>
            <th className="border fs-5 px-4">Quantity</th>
            <th className="border fs-5 px-4">Price</th>
            <th className="border fs-5 px-4">Operations</th>
          </tr>
        </thead>
        <tbody>
          {currentDrugs.map((drug) => (
            <tr key={drug._id}>
              <td className="border fs-5 px-4">{drug.name}</td>
              <td className="border fs-5 px-4">{drug.quantity}</td>
              <td className="border fs-5 px-4">{drug.price} ETB</td>
              <td className="px-4 border">
                <div>
                  <Link
                    to={`/drugs/update/${drug._id}`}
                    className="text-primary me-3"
                  >
                    <FaPen />
                  </Link>
                  <Link
                    to={`/drugs/delete/${drug._id}`}
                    className="text-danger"
                  >
                    <FaTrash />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-3">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </div>

      <div className="foot d-flex align-items-end">
        <Footer />
      </div>
    </div>
  );
};

export default DrugTable;
