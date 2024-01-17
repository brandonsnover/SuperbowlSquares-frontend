import { useEffect } from "react";
import { GridsIndex } from "./GridsIndex";
import { Login } from "./Login";
import { LogoutLink } from "./Logout";
import { Signup } from "./Signup";
import axios from "axios";
import { useState } from "react";
export function Content() {
  const [grids, setGrids] = useState([]);
  const handleGridsIndex = () => {
    console.log("handleGridsIndex");
    axios.get("http://localhost:3000/grids.json").then((response) => {
      console.log(response.data);
      setGrids(response.data);
    });
  };

  useEffect(handleGridsIndex, []);
  return (
    <main>
      <h1>Welcome to superb-owl !</h1>
      <Login />
      <Signup />
      <GridsIndex grids={grids} />
      <LogoutLink />
    </main>
  );
}
