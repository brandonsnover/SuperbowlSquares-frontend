import { useEffect } from "react";
import { GridsIndex } from "./GridsIndex";
import { Login } from "./Login";
import { Signup } from "./Signup";
import axios from "axios";
import { useState } from "react";
import { Grid } from "./Grid";
import { Routes, Route } from "react-router-dom";
import { Rules } from "./Rules";

export function Content() {
  const [hasSquareGrids, setHasSquareGrids] = useState([]);
  const [ownedGrids, setOwnedGrids] = useState([]);

  const handleHasSquareGridsIndex = () => {
    const userId = parseInt(localStorage.getItem("user_id"), 10);
    axios.get(`${import.meta.env.VITE_APP_API_URL}/grids.json`).then((response) => {
      const hasSquareGrids = response.data.filter((grid) => grid.users.includes(userId));
      setHasSquareGrids(hasSquareGrids);
    });
  };

  const handleOwnedGridsIndex = () => {
    const userId = parseInt(localStorage.getItem("user_id"), 10);
    axios.get(`${import.meta.env.VITE_APP_API_URL}/grids.json`).then((response) => {
      const ownedGrids = response.data.filter((grid) => grid.owner === userId);
      setOwnedGrids(ownedGrids);
    });
  };

  const [squares, setSquares] = useState([]);

  const handleIndexSquares = (id) => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}/squares.json`, { params: { grid_id: id } }).then((response) => {
      console.log(response.data);
      setSquares(response.data);
    });
  };

  const handleDeleteGrid = (ownedGrid) => {
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/grids/${ownedGrid.id}.json`).then((response) => {
      console.log(response);
      setOwnedGrids(ownedGrids.filter((g) => g.id !== ownedGrid.id));
      setHasSquareGrids(hasSquareGrids.filter((g) => g.id !== ownedGrid.id));
    });
  };

  let homepage;
  if (localStorage.jwt === undefined) {
    homepage = (
      <div style={{ textAlign: "center" }}>
        <h1>Welcome to Superb-Owl Squares</h1>
        <p>This is a fun little game to play before the big game starts</p>
        <h4>Login or Signup to get started!</h4>
        <Login />
        <Signup />
      </div>
    );
  } else {
    homepage = (
      <div>
        <GridsIndex ownedGrids={ownedGrids} hasSquareGrids={hasSquareGrids} onDeleteGrid={handleDeleteGrid} />
      </div>
    );
  }

  useEffect(handleHasSquareGridsIndex, []);
  useEffect(handleOwnedGridsIndex, []);
  return (
    <main>
      <Routes>
        <Route path="/" element={homepage} />
        <Route path="/grid/:id" element={<Grid squares={squares} onIndexSquares={handleIndexSquares} />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </main>
  );
}
