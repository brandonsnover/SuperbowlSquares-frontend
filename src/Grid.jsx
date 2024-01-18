/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Grid(props) {
  const pageparams = useParams();
  const userid = localStorage.getItem("user_id");

  useEffect(() => {
    props.onIndexSquares(pageparams.id);
  }, []);

  const handleUpdateSquare = (item) => {
    console.log("update square", item.id);
    axios
      .patch(`http://localhost:3000/squares/${item.id}.json`, {
        user_id: userid,
      })
      .then((response) => {
        props.onIndexSquares(pageparams.id);
      })
      .catch((error) => {
        console.error("error changng square", error);
      });
  };

  return (
    <div>
      <h1>Grid Name</h1>
      <div className="grid-container">
        {props.squares.map((item) => (
          <div key={item.id} className="grid-item">
            <button onClick={() => handleUpdateSquare(item)}>{item.location}</button>
            <p>{item.user_id.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
