/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
export function GridsIndex(props) {
  const navigate = useNavigate();
  const [newGrid, setNewGrid] = useState();

  const goToGrid = (id) => {
    navigate(`/grid/${id}`);
  };

  const handleCreateGrid = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/grids.json", { name: newGrid }).then((response) => {
      console.log("grid create", response.data);
      setNewGrid(response.data);
      navigate(`/grid/${response.data.id}`);
    });
  };

  return (
    <div>
      <h1>All Grids</h1>
      {props.grids.map((grid) => (
        <div key={grid.id}>
          <h3>Grid: {grid.name}</h3>
          <button onClick={() => goToGrid(grid.id)}>Go To {grid.name}</button>
        </div>
      ))}
      <form onSubmit={handleCreateGrid}>
        <h4>Make a new grid</h4>
        <div>
          {" "}
          Name: <input type="text" name="name" onChange={(e) => setNewGrid(e.target.value)} required />
          <button type="submit">Create </button>
        </div>
      </form>
    </div>
  );
}
