/* eslint-disable react/prop-types */
export function GridsIndex(props) {
  const userid = localStorage.getItem("user_id");

  if (!userid) {
    // If userid return null or an alternative component
    return null;
  }

  return (
    <div>
      <h1>All Grids</h1>
      {props.grids.map((grid) => (
        <div key={grid.id}>
          <h3>{grid.code}</h3>
        </div>
      ))}
    </div>
  );
}
