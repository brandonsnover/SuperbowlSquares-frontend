/* eslint-disable react/prop-types */
import { useEffect } from "react";

export function Grid(props) {
  const userid = localStorage.getItem("user_id");

  if (!userid) {
    // If userid return null or an alternative component
    return null;
  }

  useEffect(props.onIndexSquares, []);

  return (
    <div>
      <h1>Grid Name</h1>
      <div className="grid-container">
        {props.squares.map((item) => (
          <div key={item.id} className="grid-item">
            <button>{item.location}</button>
            <p>{item.user_id.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
