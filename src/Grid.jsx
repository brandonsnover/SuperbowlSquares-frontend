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
  const numbers = [" ", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numbers_column = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const sortedSquares = [...props.squares].sort((a, b) => a.id - b.id);

  for (let i = 0; i < sortedSquares.length; i += 11) {
    sortedSquares.splice(i, 0, { id: 9999 + i, location: i / 11, user_id: 1, grid_id: parseInt(pageparams.id) });
  }
  console.log(sortedSquares);
  return (
    <div>
      <h1>Grid Name</h1>
      <div>
        <div className="grid-container">
          {numbers.map((number) => (
            <div key={number}>
              <p className="grid-item">{number}</p>
            </div>
          ))}
        </div>
        <div className="grid-container">
          {sortedSquares.map((item, index) => (
            <div key={item.id} className="grid-item">
              {index % 11 === 0 ? (
                <p>{numbers_column[index / 11]}</p>
              ) : (
                <>
                  <button onClick={() => handleUpdateSquare(item)}>{item.location}</button>
                  <p>{item.user_id && item.user_id.username}</p>
                  {userid == item.user_id.id ? <button onClick={() => handleClick(item)}>Remove Name</button> : <></>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
