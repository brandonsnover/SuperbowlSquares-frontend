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
    <div className="lists-container">
      <h1 className="grids-with-squares">Grids With Squares</h1>
      <div className="grid-container-home">
        {props.hasSquareGrids.map((grid) => (
          <div className="grid-item-home" key={grid.id}>
            <h2>Grid: {grid.name}</h2>
            <h4>Invite Code: {grid.code}</h4>
            <button style={{ marginLeft: 10 }} onClick={() => goToGrid(grid.id)}>
              Go To {grid.name}
            </button>
          </div>
        ))}
      </div>
      <h1 className="owned-grids">Owned Grids</h1>
      <div className="grid-container-home">
        {props.ownedGrids.map((grid) => (
          <div className="grid-item-home" key={grid.id}>
            <h2>Grid: {grid.name}</h2>
            <h4>Invite Code: {grid.code}</h4>
            <button style={{ marginLeft: 10 }} onClick={() => goToGrid(grid.id)}>
              Go To {grid.name}
            </button>
            <button style={{ marginLeft: 10 }} onClick={() => props.onDeleteGrid(grid)}>
              Delete Grid
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleCreateGrid}>
        <h4>Create your own</h4>
        <div>
          {" "}
          Name:{" "}
          <input
            type="text"
            name="name"
            placeholder=" Grid Name "
            onChange={(e) => setNewGrid(e.target.value)}
            required
          />
          <button type="submit">Create </button>
        </div>
      </form>
    </div>
  );
}
