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
      <h4>Enter grid code:</h4>
      <div>
        <input type="text" name="code" />
        <button type="submit">Go </button>
      </div>
      <h1>Your Grids</h1>
      {props.hasSquareGrids.map((grid) => (
        <div key={grid.id}>
          <h3>Grid: {grid.name}</h3>
          <button onClick={() => goToGrid(grid.id)}>Go To {grid.name}</button>
        </div>
      ))}
      <h1>Owned Grids</h1>
      {props.ownedGrids.map((grid) => (
        <div key={grid.id}>
          <h3>Grid: {grid.name}</h3>
          <h3>Code: {grid.code}</h3>
          <button onClick={() => goToGrid(grid.id)}>Go To {grid.name}</button>
          <button onClick={() => props.onDeleteGrid(grid)}>Delete Grid</button>
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
