import { useState } from "react";
import { Grid } from "./Grid";
import axios from "axios";

export function Content() {
  const [squares, setSquares] = useState([]);

  const handleIndexSquares = () => {
    axios.get("http://localhost:3000/squares.json", { params: { grid_id: 14 } }).then((response) => {
      console.log(response.data);
      setSquares(response.data);
    });
  };

  return (
    <main>
      <h1>Welcome to React!</h1>
      <Grid squares={squares} onIndexSquares={handleIndexSquares} />
    </main>
  );
}
