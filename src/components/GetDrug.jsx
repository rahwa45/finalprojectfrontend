import React, { useState, useEffect } from "react";
import axios from "axios";

const GetDrug = () => {
  const [query, setQuery] = useState("");
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch drugs based on input
  const fetchDrugs = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setDrugs([]); // Clear list if input is empty
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // Get token from localStorage

      const { data } = await axios.get(
        `https://finalproject-backend-zagu.onrender.com/api/drugs`,
        {
          params: { query: searchTerm },
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );

      setDrugs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching drugs:", error.response?.data || error);
      setDrugs([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce function to reduce API calls
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchDrugs(query);
    }, 500); // Waits 500ms before sending request

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a drug..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      <ul>
        {drugs.length > 0
          ? drugs.map((drug) => (
              <li key={drug._id}>
                {drug.name} - ${drug.price}
              </li>
            ))
          : query && !loading && <p>No drugs found</p>}
      </ul>
    </div>
  );
};

export default GetDrug;
