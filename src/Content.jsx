import { useEffect } from "react";
import { GridsIndex } from "./GridsIndex";
import { Login } from "./Login";
import { LogoutLink } from "./Logout";
import { Signup } from "./Signup";
import axios from "axios";
import { useState } from "react";
import { Grid } from "./Grid";
import { Routes, Route } from "react-router-dom";

export function Content() {
  const [grids, setGrids] = useState([]);
  const [ownedGrids, setOwnedGrids] = useState([]);

  const handleGridsIndex = () => {
    console.log("handleGridsIndex");
    axios.get("http://localhost:3000/grids.json").then((response) => {
      console.log(response.data);
      setGrids(response.data);
    });
  };

  const handleOwnedGridsIndex = () => {
    axios.get("http://localhost:3000/ownergrids.json").then((response) => {
      console.log(response.data);
      setOwnedGrids(response.data);
    });
  };

  const [squares, setSquares] = useState([]);

  const handleIndexSquares = (id) => {
    axios.get("http://localhost:3000/squares.json", { params: { grid_id: id } }).then((response) => {
      console.log(response.data);
      setSquares(response.data);
    });
  };

  const handleDeleteGrid = (ownedGrid) => {
    axios.delete(`http://localhost:3000/grids/${ownedGrid.id}.json`).then((response) => {
      console.log(response);
      setOwnedGrids(ownedGrids.filter((g) => g.id !== ownedGrid.id));
      setGrids(grids.filter((g) => g.id !== ownedGrid.id));
    });
  };

  let homepage = (
    <div>
      <Login />
      <Signup />
      <GridsIndex grids={grids} ownedGrids={ownedGrids} onDeleteGrid={handleDeleteGrid} />
      <LogoutLink />
    </div>
  );

  useEffect(handleOwnedGridsIndex, []);
  useEffect(handleGridsIndex, []);
  return (
    <main>
      <h1>Welcome to superb-owl !</h1>
      <Routes>
        <Route path="/" element={homepage} />
        <Route path="/grid/:id" element={<Grid squares={squares} onIndexSquares={handleIndexSquares} />} />
      </Routes>
    </main>
  );
}
