import { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5559/api/search?query=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      setResults(data); // Update state with search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <ul>
        {results.map((item) => (
          <li key={item._id}>{item.name}</li> // Display drug names
        ))}
      </ul>
    </div>
  );
};

export default Search;
