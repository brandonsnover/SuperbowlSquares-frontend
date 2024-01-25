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
  const [hasSquareGrids, setHasSquareGrids] = useState([]);
  const [ownedGrids, setOwnedGrids] = useState([]);

  const handleHasSquareGridsIndex = () => {
    const userId = parseInt(localStorage.getItem("user_id"), 10);
    axios.get("http://localhost:3000/grids.json").then((response) => {
      const hasSquareGrids = response.data.filter((grid) => grid.users.includes(userId));
      setHasSquareGrids(hasSquareGrids);
    });
  };

  const handleOwnedGridsIndex = () => {
    const userId = parseInt(localStorage.getItem("user_id"), 10);
    axios.get("http://localhost:3000/grids.json").then((response) => {
      const ownedGrids = response.data.filter((grid) => grid.owner === userId);
      setOwnedGrids(ownedGrids);
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
      setHasSquareGrids(hasSquareGrids.filter((g) => g.id !== ownedGrid.id));
    });
  };

  let homepage = (
    <div>
      <Login />
      <Signup />
      <GridsIndex ownedGrids={ownedGrids} hasSquareGrids={hasSquareGrids} onDeleteGrid={handleDeleteGrid} />
      <LogoutLink />
    </div>
  );

  useEffect(handleHasSquareGridsIndex, []);
  useEffect(handleOwnedGridsIndex, []);
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
