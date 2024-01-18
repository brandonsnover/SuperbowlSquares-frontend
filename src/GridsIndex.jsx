/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
export function GridsIndex(props) {
  const navigate = useNavigate();
  const goToGrid = (id) => {
    navigate(`/grid/${id}`);
  };

  return (
    <div>
      <h1>All Grids</h1>
      {props.grids.map((grid) => (
        <div key={grid.id}>
          <h3>{grid.code}</h3>
          <button onClick={() => goToGrid(grid.id)}>Go To Grid</button>
        </div>
      ))}
    </div>
  );
}
