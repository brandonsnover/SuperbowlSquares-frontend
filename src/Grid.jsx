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
        console.log(response);
        props.onIndexSquares(pageparams.id);
      })
      .catch((error) => {
        console.error("error changng square", error);
      });
  };

  const handleClick = (item) => {
    axios
      .delete(`http://localhost:3000/squares/${item.id}.json`)
      .then((response) => {
        console.log(response);
        props.onIndexSquares(pageparams.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sortedSquares = [...props.squares].sort((a, b) => a.id - b.id);

  return (
    <div>
      <h1>Grid Name</h1>
      <div className="grid-container">
        {sortedSquares.map((item) => (
          <div key={item.id} className="grid-item">
            <button onClick={() => handleUpdateSquare(item)}>{item.location}</button>
            <p>{item.user_id && item.user_id.username}</p>
            {userid == item.user_id.id ? <button onClick={() => handleClick(item)}>Remove Name</button> : <></>}
          </div>
        ))}
      </div>
    </div>
  );
}
