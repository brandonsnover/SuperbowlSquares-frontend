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
  const handleGridsIndex = () => {
    console.log("handleGridsIndex");
    axios.get("http://localhost:3000/grids.json").then((response) => {
      console.log(response.data);
      setGrids(response.data);
    });
  };

  const [squares, setSquares] = useState([]);

  const handleIndexSquares = () => {
    axios.get("http://localhost:3000/squares.json", { params: { grid_id: 14 } }).then((response) => {
      console.log(response.data);
      setSquares(response.data);
    });
  };

  let homepage = (
    <div>
      <Login />
      <Signup />
      <GridsIndex grids={grids} />
      <LogoutLink />
    </div>
  );

  useEffect(handleGridsIndex, []);
  return (
    <main>
      <h1>Welcome to superb-owl !</h1>
      <Routes>
        <Route path="/" element={homepage} />
        <Route path="/grid" element={<Grid squares={squares} onIndexSquares={handleIndexSquares} />} />
      </Routes>
    </main>
  );
}
