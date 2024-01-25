import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:3000/grids.json");
      const grids = response.data;
      const grid = grids.find((grid) => grid.code === code.toUpperCase());

      if (grid) {
        navigate(`/grid/${grid.id}`);
      } else {
        alert("Grid not found");
      }
    } catch (error) {
      console.error("Error fetching grids:", error);
      alert("Error searching for grid");
    }
  };

  return (
    <header>
      <nav>
        <a href="/">Home</a>
        <form onSubmit={handleSubmit}>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter grid code" />
          <button type="submit">Search</button>
        </form>
      </nav>
    </header>
  );
}
