import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutLink } from "./Logout";
import { Link } from "react-router-dom";

export function Header() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/grids.json`);
      const grids = response.data;
      const grid = grids.find((grid) => grid.code === code.toUpperCase());

      if (grid) {
        navigate(`/grid/${grid.id}`);
        console.log("tryin to go somewhere");
        window.location.reload();
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
        <Link to="/rules">Rules</Link>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder=" Enter Invite Code Here "
          />
          <button type="submit">Search</button>
        </form>
        <LogoutLink />
      </nav>
    </header>
  );
}
